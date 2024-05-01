export default function devConsole() {
    // Only log messages in development environment
    if (process.env.NODE_ENV === 'production') {
        console.log = function() {};
        console.error = function() {};
    }
}