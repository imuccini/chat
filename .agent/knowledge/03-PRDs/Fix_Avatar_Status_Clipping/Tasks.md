# Fix Avatar Status Indicator Clipping

The status indicators (dots) on user and room avatars are being clipped because of overflow settings on their parent containers.

- [x] Identify all components using avatars with status indicators <!-- id: 0 -->
    - [x] `UnifiedChatList.tsx` <!-- id: 1 -->
    - [x] `UserList.tsx` <!-- id: 2 -->
    - [x] `GlobalChat.tsx` <!-- id: 3 -->
- [x] Research `ui/avatar.tsx` for core implementation <!-- id: 4 -->
- [/] Implement fixes to prevent clipping (remove `overflow-hidden` or adjust positioning/z-index) <!-- id: 5 -->
- [ ] Verify fix visually (if possible) or via code review <!-- id: 6 -->
