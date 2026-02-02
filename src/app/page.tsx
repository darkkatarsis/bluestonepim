import { Box, Typography } from '@mui/material';
import styles from './page.module.css';

export default function HomePage() {
    return (
        <Box component="main" className={styles.container}>
            <Typography variant="h4" component="h1" gutterBottom>
                Hello Bluestone PIM
            </Typography>
            <Typography variant="body1" color="text.secondary">
                Product Information Management
            </Typography>
        </Box>
    );
}
