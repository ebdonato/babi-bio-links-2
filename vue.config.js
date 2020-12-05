module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  chainWebpack: config => {
    config
      .plugin('html')
      .tap(args => {
        args[0].title = 'Babi - Links para o Instagram';	// Replace your title here
        return args;
      });
  }
}
