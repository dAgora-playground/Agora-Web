<script setup>
    import { getAllNotes } from "../crossbell";

    (async () => {
        const notes = await getAllNotes();
        console.log("all notes", notes);
    })(); 

    

    
    
</script>
<template>
  <div class="topBox">
    <div class="nav">
        <img src="../../public/vector.png" alt="agora-logo" class="logo">

        <div class="sel">
            <div class="icon">
                <img src="../../public/hemisphereEastGray.png" alt="home-icon" class="selImg">
            </div>
            <div class="icon">
                <img src="../../public/userCircle.png" alt="user-icon" class="selImg">
            </div>
        </div>
    </div>

    <div class="mainBox">
        <div class="top-nav">
            <h2>Home</h2>
            <div class="search"></div>
            <div class="connect-button"></div>
        </div>

        <div class="tag">
            Discover
        </div>

        <div class="cordBox">
            <div class="cord" v-for="item in notes">
                <div class="title">
                    {{ item.title }}
                </div>
                <div class="author-info">
                    <div class="avtor">
                        <img src="" alt="">
                    </div>
                    <div class="author-name">
                        {{ item.name }}
                    </div>
                </div>

                <div class="content">
                    {{ item.content }}    
                </div>

                <div class="pulished-time">Today 11:30 pm</div>

                <div class="content-tags">
                    <div class="tag">{{item.tags}}</div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
    .topBox{
        background: linear-gradient(to right, green, orange);
        .nav{
            background-color: rgba(20,26,22,0.8);
            .logo{
                width: 58px;
                height: 50px;
            }

            .sel{
                .icon{
                    width: 38px;
                    height:38px ;
                }
            }


        }
    }

</style>