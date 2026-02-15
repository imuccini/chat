export function compressImage(
    file: File,
    maxSize = 400,
    quality = 0.8,
): Promise<File> {
    return new Promise((resolve, reject) => {
        // Use FileReader.readAsDataURL instead of URL.createObjectURL
        // because WKWebView's sandbox blocks blob URL image decoding
        const reader = new FileReader();

        reader.onload = () => {
            const dataUrl = reader.result as string;
            const img = new Image();

            img.onload = () => {
                let { width, height } = img;

                // Scale down to fit within maxSize x maxSize
                if (width > maxSize || height > maxSize) {
                    if (width > height) {
                        height = Math.round((height * maxSize) / width);
                        width = maxSize;
                    } else {
                        width = Math.round((width * maxSize) / height);
                        height = maxSize;
                    }
                }

                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    reject(new Error('Could not get canvas context'));
                    return;
                }

                ctx.drawImage(img, 0, 0, width, height);

                canvas.toBlob(
                    (blob) => {
                        if (!blob) {
                            reject(new Error('Canvas toBlob failed'));
                            return;
                        }
                        resolve(new File([blob], 'avatar.jpg', { type: 'image/jpeg' }));
                    },
                    'image/jpeg',
                    quality,
                );
            };

            img.onerror = () => {
                reject(new Error('Failed to load image for compression'));
            };

            img.src = dataUrl;
        };

        reader.onerror = () => {
            reject(new Error('Failed to read file'));
        };

        reader.readAsDataURL(file);
    });
}
