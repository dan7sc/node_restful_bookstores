module.exports = async function() {
    console.log('Teardown App Connection');
    delete global.appClient;
};
