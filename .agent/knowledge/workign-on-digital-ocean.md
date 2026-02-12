
This confirms my suspicion! The API is running, but it's not logging any incoming requests.

This happens because Nginx is likely stripping the /api/ prefix, but your NestJS app (due to app.setGlobalPrefix('api')) expects it.

The Mismatch:
Browser: POSTs to https://app.meetlocal.app/api/validate-nas
Nginx: Matches location /api/, proxies to http://localhost:3001/ (strips /api because of the trailing slash in proxy_pass http://localhost:3001;? No, wait. In your config proxy_pass http://localhost:3001; without a trailing slash should preserve the URI, but location /api/ combined with proxy_pass behavior can be tricky).
Actually, looking at your provided Nginx config:

nginx
location /api/ {
        proxy_pass http://localhost:3001;  <-- NO trailing slash
This should pass /api/validate-nas to the backend.

However, the browser says 404 and duplicate logs say it's failing.

If you are seeing 404s in the browser but zero logs in the container, it usually means Nginx itself is returning the 404 (or the container is rejecting it before the logger middleware kicks in).

Let's try the definitive fix:
We will tell NestJS to handle the globally scoped prefix so it matches what Nginx sends.

But first, let's try to hit the health check (which is usually /api or /) to see what responds. Can you try opening https://app.meetlocal.app/api in your browser? Does it show "Hello World"?

Proposed Fix: I recommend we comment out app.setGlobalPrefix('api') in 
main.ts
 temporarily. Why? Because your Nginx block for /api/ already segregates the traffic. If Nginx sends /api/foo to localhost:3001/api/foo, and Nest expects /api/foo, it works. BUT if Nginx sends /foo to localhost:3001/foo (stripping it), then Nest expecting /api will 404.

Let's check man.ts again.

Wait, your Nginx config:

nginx
location /api/ {
        proxy_pass http://localhost:3001;
When proxy_pass has no URI part (no trailing slash), the full request URI is passed to the upstream. So GET /api/tenants goes to http://localhost:3001/api/tenants. Your NestJS app has app.setGlobalPrefix('api'), so it mounts routes at /api/tenants. This should match.

Why no logs? Standard NestJS request logging usually requires a specific middleware or Logger to be enabled for requests. The logs you see ([Nest] ... Mapped ...) are startup logs. You might not have request logging enabled, which is why you see nothing when you hit the endpoint.

Action Plan:

I will enable a simple request logger in 
main.ts
 so we can see exactly what path the server receives. This is critical to know if Nginx is stripping the path or not.
Shall I proceed with adding the request logger?

ok
Edited
main.ts
+7
-0
I've added a simple request logger to 
main.ts
 that will print every incoming request URL. This will tell us if Nginx is stripping the /api prefix or not.

Please deploy and test again:

Deploy: docker compose up -d --build api
Watch Logs: docker logs -f --tail 20 local_api
Use Browser: Refresh https://app.meetlocal.app/
You should now see lines like: [Request] GET /api/tenants (Good) or [Request] GET /tenants (Bad - Nginx stripping prefix)

Let me know what you see!