<template>
    <div id="post" v-editable="blok">
        <div class="post-thumbnail" :style="{backgroundImage: 'url('+image+') '}"></div>
            <section class="post-content">
                <h1>{{title}}</h1>
            <p>{{content}}</p>
            </section>
            
        
    </div>
</template> 

<script>
export default {
    asyncData(context){
        //check if we are in editor mode
        // let version=context.query._storyblok || context.isDev ? 'draft':'published'
        return context.app.$storyapi.get('cdn/stories/blog/'+context.params.postId,{
            version:process.env.NODE_ENV == "production" ? "published": "draft"
        }).then((response)=>{
            console.log(response.data);
         return  {
               blok: response.data.story.content,
               image: response.data.story.content.thumbnail,
               title: response.data.story.content.title,
               content: response.data.story.content.content
           }
        })
    },
    mounted() {
        this.$storyblok.init();
        this.$storyblok.on('change',()=>{
            location.reload(true);
        })
    },
}
</script>
<style>
.post-thumbnail{
    width: 100%;
    height: 300px;
    background-size: cover;
    background-position: center;
}
.post-content{
    width:80%;
    max-width: 500px;
    margin: auto;
}

.post-content p {
    white-space: pre-line;
}
</style>


