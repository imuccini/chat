"use client"

import { useState, KeyboardEvent, useRef } from "react"
import { X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface TagInputProps {
    id?: string;
    name: string;
    defaultValue?: string[];
    placeholder?: string;
    className?: string;
}

export function TagInput({
    id,
    name,
    defaultValue = [],
    placeholder = "Type and press Enter...",
    className
}: TagInputProps) {
    const [tags, setTags] = useState<string[]>(defaultValue);
    const [inputValue, setInputValue] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            addTag();
        } else if (e.key === 'Backspace' && inputValue === '' && tags.length > 0) {
            // Remove last tag on backspace if input is empty
            removeTag(tags.length - 1);
        }
    };

    const addTag = () => {
        const value = inputValue.trim();
        if (value && !tags.includes(value)) {
            setTags([...tags, value]);
            setInputValue("");
        }
    };

    const removeTag = (index: number) => {
        setTags(tags.filter((_, i) => i !== index));
    };

    return (
        <div className={className}>
            {/* Hidden input for form submission */}
            <input type="hidden" name={name} value={tags.join(',')} />

            <div
                className="flex flex-wrap gap-1.5 p-2 border rounded-md min-h-[40px] bg-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 cursor-text"
                onClick={() => inputRef.current?.focus()}
            >
                {tags.map((tag, index) => (
                    <Badge
                        key={index}
                        variant="secondary"
                        className="flex items-center gap-1 px-2 py-0.5 text-sm font-normal"
                    >
                        {tag}
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                removeTag(index);
                            }}
                            className="ml-1 rounded-full hover:bg-muted-foreground/20 p-0.5"
                        >
                            <X className="h-3 w-3" />
                            <span className="sr-only">Remove {tag}</span>
                        </button>
                    </Badge>
                ))}
                <input
                    ref={inputRef}
                    id={id}
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onBlur={addTag}
                    placeholder={tags.length === 0 ? placeholder : ""}
                    className="flex-1 min-w-[120px] bg-transparent outline-none text-sm placeholder:text-muted-foreground"
                />
            </div>
        </div>
    );
}
