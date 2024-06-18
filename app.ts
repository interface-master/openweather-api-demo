import app from './server';
const port = process.env.port || 3000;

// Listening is one of the loudest forms of kindness
app.listen(port, () => {
    console.info(`${(new Date()).toISOString()}: Server listening on port ${port}`);
});
