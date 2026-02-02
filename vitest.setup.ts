import '@testing-library/jest-dom/vitest';
import 'fake-indexeddb/auto';

// Mock MUI TouchRipple to avoid act() warnings in tests
vi.mock('@mui/material/ButtonBase/TouchRipple', () => ({
    default: () => null,
}));

// Mock next/navigation
vi.mock('next/navigation', () => ({
    useRouter: () => ({
        push: vi.fn(),
        back: vi.fn(),
        forward: vi.fn(),
        refresh: vi.fn(),
        replace: vi.fn(),
        prefetch: vi.fn(),
    }),
    usePathname: () => '/',
    useSearchParams: () => new URLSearchParams(),
}));
