import dayjs from 'dayjs';

export function formatTimestamp(timestamp: Date) {
    return dayjs(timestamp).format('DD/MM/YYYY HH:mm:ss');
}
