<template>
    <div id="post">
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
        return context.app.$storyapi.get('cdn/stories/blog/'+context.params.postId,{
            version:'draft'
        }).then((response)=>{
         return  {
               image: response.data.story.content.thumbnail,
               title: response.data.story.content.title,
               content: response.data.story.content.content
           }
        })
    }
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


