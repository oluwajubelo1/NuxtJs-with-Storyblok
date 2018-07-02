<template>
    <section id="about-page">
        <h1>{{title}}</h1>
        <p>{{content}}</p>
    </section>
</template>

<script>
export default {
    asyncData(context){
        //check if we are in the editor mode
        let version= context.query._storyblok || context.isDev ? 'draft':'Published'
        return context.app.$storyapi.get('cdn/stories/about',{
            version:version
        }).then((response)=>{
            
            return {
            title: response.data.story.content.title,
            content: response.data.story.content.content
            }
        })
    }
}
</script>

<style scoped>
    #about-page{
        width: 80%;
        max-width: 500px;
        margin: auto;
    }
    #about-page p{
        white-space: pre-line;
    }
</style>

