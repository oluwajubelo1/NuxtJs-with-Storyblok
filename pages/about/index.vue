<template>
    <section id="about-page" v-editable="blok">
        <h1>{{title}}</h1>
        <p>{{content}}</p>
    </section>
</template>

<script>
export default {
    asyncData(context){
        //check if we are in the editor mode
        let version= context.query._storyblok || context.isDev ? 'draft':'published'
        return context.app.$storyapi.get('cdn/stories/about',{
            version:version
        }).then((response)=>{
            return {
            blok: response.data.story.content,
            title: response.data.story.content.title,
            content: response.data.story.content.content
            }
        })
    },
    mounted(){
        this.$storyblok.init();
        this.$storyblok.on('change',()=>{
            location.reload(true);
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

