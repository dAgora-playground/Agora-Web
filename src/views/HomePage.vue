<script>
    import { getAllNotes } from "../crossbell";


    export default defineComponent({
    async setup() {
            const notes = await getAllNotes();
            console.log("all notes", notes.list);
            return {
                items: notes.list
            }
    }
});
    
</script>
<template>
    <div class="top-box">
        <div class="side-bar">
            <img src="../../public/vector.png" alt="agora-logo" class="agora-logo">

            <!-- <div class="navigation">
                <div class="item-logo">
                    <img src="../../public/hemisphereEastGray.png" alt="home-icon" class="item-img">
                </div>
                <div class="item-logo">
                    <img src="../../public/userCircle.png" alt="user-icon" class="item-img">
                </div>
            </div> -->

            <div class="agora-logo"></div>
        </div>

        <div class="main-box">
            <div class="top-nav">
                <div class="main-titile">Home</div>
                <div class="searchBox">
                    <form class="search-bar">
                        <input type="text" placeholder="Search dAgora...">
                        <!-- <button type="submit">
                            <img src="../../public/Search.png" alt="">
                        </button> -->
                    </form>
                </div>
                <div class="connect-button">Connect wallet</div>
            </div>

            <div class="tag">
                Discover
            </div>

            <div class="cardBox">
                <div class="card" v-for="(item,index) in items">
                    <div class="title">
                        {{ item.title }}
                    </div>
                    <div class="author-info">
                        <div class="avtor">
                            <img src="" alt="">
                        </div>
                        <div class="author-name">
                            {{ item.author }}
                        </div>
                    </div>

                    <div class="content">
                        {{ item.content }}
                    </div>

                    <div class="pulished-time">{{ item.time }}</div>

                    <!-- <div class="content-tags">
                        <div class="tag">{{ item.tags }}</div>
                    </div> -->
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">

*{
    .top-box{
        display: flex;
        justify-content: space-between;
        // background: linear-gradient(to right, green, orange);
        .side-bar{
            width: 1200px;
            height: 105px;
            // background-color: rgba(20,26,22,0.2); ;
            display: flex;
            // flex-direction: row-reverse;
            justify-content: space-between;

            .agora-logo{
                width: 58px;
                height: 58px;
            }

            .item-img {
                width: 30px;
                height: 30px;
            }

            .navigation{
                display: flex;
                justify-content: space-around;
            }

        }

        .main-box{
            .top-nav{
                display: flex;
                justify-content: space-between; 
                .main-titile{
                    color: black;
                    font-size: 40px;
                    line-height: 48px;
                }

                .searchBox{
                    padding: 12px 0;
                    .search-bar{
                        display: flex;
                        justify-content: center;
                        height: 32px;
                        input {
                            width: 400px;
                            border-radius: 20px;
                            border: 1px solid #998882;
                            transition: .3s linear;
                            float: right;
                        }
                        input:focus {
                            width: 300px;
                        }
                        button {
                            background: none;
                            top: -2px;
                            right: 0;
                        }
                        button:before{
                            content: "\f002";
                            font-family: FontAwesome;
                            color: #998882;
                        }
                    }
                }
                .connect-button {
                    // width: 140px;
                    // height: 40px;
                    border-radius: 4px;
                    background-color: orange;
                    border: none;
                    color: white;
                    padding: 7px 16px;
                    text-align: center;
                    text-decoration: none;
                    display: inline-block;
                    font-size: 16px;
                    margin: 4px 2px;
                    cursor: pointer;
                    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
                }
            }
        }
    }

}

</style>