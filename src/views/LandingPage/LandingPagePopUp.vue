<style lang="scss">
.landing-page-pop-up {
    width: 665px;
    height: 560px;

    background: white;
    border-radius: 16px;

    box-shadow: 0px 2px 10px 0px #0000001A;

    display: grid;
    grid-template-rows: 145px 415px;
    grid-template-areas: 
        "header"
        "main";

    header {
        display: flex;
        align-items: center;
    }
}
</style>

<template lang="pug">
    div.landing-page-pop-up
        header: slot(name="header")
        div: slot(name="main")
</template>

<script>
export default {
    name: 'LandingPagePopUp'
}
</script>
