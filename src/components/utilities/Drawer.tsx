import Drawer from '@mui/material/Drawer';

interface TemporaryDrawerProps {
    open: boolean;
    toggleDrawer: (open: boolean) => void;
}

export default function TemporaryDrawer({ open, toggleDrawer }: TemporaryDrawerProps) {
    return (
        <Drawer open={open} onClose={() => toggleDrawer(false)}>
        </Drawer>
    );
}