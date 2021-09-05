<style scoped lang="scss">
@import "@/common/styles/variables.scss";

.pop-up-header{
    display: flex;
    align-items: center;
    grid-area: header;

    margin-left: 33px;

    cursor: pointer;

    .pop-up-title{
        display: block;

        color: $color-primary;
        font-family: Roboto;
        font-style: normal;
        font-weight: 500;
        font-size: 25px;
        line-height: 150%;

        margin-left: 26px;
    }
}
.pop-up-main{
    display: flex;
    flex-direction: column;
    align-items: center;
    grid-area: main;

    & > * {
        margin-bottom: 20px;
    }
    img {
        width: 152px;
        height: 152px;
    }
    h2 {
        width: 337px;

        font-family: Roboto;
        font-style: normal;
        font-weight: 500;
        font-size: 25px;
        line-height: 150%;
        
        text-align: center;
    }
    .v-btn {
        width: 506px;
        height: 53px !important;
        
        font-family: Raleway;
        font-style: normal;
        font-weight: 600;
        font-size: 20px !important;
        line-height: 30px;
        text-transform: none;
        margin-bottom: 20px;
    }
}
</style>

<template lang="pug">
    LandingPagePopUp
        template(v-slot:main): div.pop-up-main
            img(src='@/assets/alert-circle.png')
            h2 No Accounts Found
            v-btn(class='white--text', elevation='0', color='primary') Generate Account
            v-btn(elevation='0', color='primary', outlined) Import Keystore
</template>

<script>
import LandingPagePopUp from '@/views/LandingPage/LandingPagePopUp.vue'

export default {
    name: 'ImportKeystore',
    components: {
        LandingPagePopUp,
    },
    methods: {
        previous() {
            this.$router.push({name: 'landing-page'});
        },

        signIn() {
            this.$router.push({name: 'sign-in'});
        },
    },
}
</script>