<template>
  <section id="posts">
    <PostPreview  v-for="post in posts"
    :key="post.id"
    :title="post.title"
    :excerpt="post.previewText"
    :thumbnailURL="post.thumbnailURL"
    :id="post.id"/>
  </section>
</template>

<script>
import PostPreview from '@/components/Blog/PostPreview'
export default {
  components:{
    PostPreview
  },
  asyncData(context){
    return context.app.$storyapi.get("cdn/stories",{
      version:'draft',
      starts_width: 'blog/'
    }).then((response)=>{
      // console.log(response);
      return {
        posts: response.data.stories.map(bp=>{
        return {
          id :bp.slug,
          title: bp.content.title,
          previewText: bp.content.summary,
          thumbnailURL: bp.content.thumbnail 
        }
      })
      };
    })
  }
  // data(){
  //   return{
  //     posts:[
  //       {title:'A new Beginning',
  //       previewText:'This will be awesone, don\'t miss out',
  //       thumbnailURL:'https://pass.ng/images/app-interface.png',
  //       id:'first-image'
  //       },
  //       {title:'A second Beginning',
  //       previewText:'This will be awesone, don\'t miss out',
  //       thumbnailURL:'https://pass.ng/images/app-interface.png',
  //       id:'second-image'
  //       },
  //     ]
  //   }
  // }
}
</script>

<style scoped>
  #posts{
    padding-top: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  @media(min-width: 35rem){
    #posts{
      flex-direction: row;
    }
  }
</style>
