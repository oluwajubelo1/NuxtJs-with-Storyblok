const axios=require("axios");
module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'storyblok-blog',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'A storyblokJS sprinkled on a nuxtJS project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {rel:'stylesheet', href:'https://fonts.googleapis.com/css?family=Lato:400,700'}
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Nuxt.js modules
  */
  modules:[
    //Doc: https://github.com/nuxt-community/axios-module#usage
    ["storyblok-nuxt",
    {accessToken: process.env.NODE_ENV == "production" 
    ? "YOUR_PUBLIC_KEY"
     : "YOUR_PREVIEW_KEY",
     cacheProvider:"memory"}
  ]
  ],

  generate:{
    routes:function(){
        return axios.get('https://api.storyblok.com/v1/cdn/stories?version=published&token=8BN0EA8AbXf4qzcAbmNNBAtt&starts_with=blog&cv='+
         Math.floor(Date.now()/1e3)).then((response)=>{
           const blogPosts=response.data.stories.map(bp=>bp.full_slug)
          return [
            '/',
            '/blog',
            '/about',
            ...blogPosts
          ]
         })
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
