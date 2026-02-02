'use client';

import { TextField, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

interface ProductSearchProps {
    value: string;
    onChange: (value: string) => void;
}

export function ProductSearch({ value, onChange }: ProductSearchProps) {
    return (
        <TextField
            fullWidth
            placeholder="Search products..."
            value={value}
            onChange={(e) => onChange(e.target.value)}
            slotProps={{
                input: {
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                    ),
                },
            }}
        />
    );
}
