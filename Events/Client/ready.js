module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log(`El bot ${client.user.username} está online`);
    },
};
