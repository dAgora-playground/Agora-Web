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

            <div class="navigation">
                <div class="item-logo">
                    <img src="../../public/hemisphereEastGray.png" alt="home-icon" class="item-img">
                </div>
                <div class="item-logo">
                    <img src="../../public/ArchiveTray.png" alt="user-icon" class="item-img">
                </div>
                <div class="item-logo">
                    <img src="../../public/userCircle.png" alt="user-icon" class="item-img">
                </div>
            </div>

            <div class="agora-logo"></div>
        </div>

        <div class="main-box">
            <div class="top-nav">
                <div class="main-titile">dAgora</div>
                <div class="searchBox">
                    <form class="search-bar">
                        <input type="text" placeholder="Search dAgora...">
                    </form>
                </div>
                <div class="connect-button">
                    Connect wallet
                </div>
            </div>

            <!-- <div class="tag">
                Discover
            </div> -->

            <div class="cardBox">
                <div class="card" v-for="(item,index) in items">

                    <div class="card-top">
                        <div class="title">
                            {{ item.title }}
                        </div>
                        <div class="collect-button">Collect</div>
                    </div>

                    <div class="author-info">
                                <!-- <div class="avtor">
                                    <img src="" alt="">
                                </div> -->
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
        margin: 0;
        display: flex;
        justify-content: space-between;
        background: linear-gradient(to right,#202020, green, #F3A34B, #202020);
        backdrop-filter: blur(6px);
        .side-bar{
            display: flex;
            flex-direction: column;
            justify-content: space-between;

            border: #998882 1px solid;
            border-radius: 0px 16px 16px 0px;
            background-color: rgba(26, 20, 20, 0.8);
            backdrop-filter: blur(10px);
            margin: 20px 20px 20px 0px;
            padding: 24px 24px;

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
                flex-direction: column;
                // justify-content: space-between;
                .item-logo{
                    margin: 12px;
                }


            }

        }

        .main-box{
            border: #998882 1px solid;
            border-radius: 16px 0px 0px 16px;
            background-color: rgba(26, 20, 20, 0.8);
            backdrop-filter: blur(10px);
            margin: 20px 0px 20px 20px;
            padding: 24px 38px;
            .top-nav{
                display: flex;
                justify-content: space-between; 
                .main-titile{
                    color: #FFFFFF;
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
                    margin: 8px 0;
                    display: flex;
                    align-items: center;
                    border-radius: 8px;
                    background-color: #F3A34B;
                    border: none;
                    color: #000000;
                    padding: 8px 16px;
                    text-align: center;
                    font-size: 16px;
                    cursor: pointer;
                }
            }

            .cardBox{
                color: #FFFFFF;
                margin: 72px 0px 0px 0px;
                .card {
                    border: #998882 1px solid;
                    border-radius: 16px;
                    margin-bottom: 24px;
                    padding: 16px;
                    .card-top{
                            display: flex;
                            justify-content: space-between;
                            margin-bottom: 8px;
                            .title{
                                font-size: 22px;
                            }
                            .collect-button{
                                background-color: #8AE064;
                                color: #000000;
                                text-align: center;
                                padding: 8px 16px;
                                border: none;
                                border-radius: 8px;
                            }
                    }
                    .author-info{
                        margin-left: 12px;
                        margin-bottom: 16px;
                        .author-name{
                            color: #CCC4C4;
                            font-size: 12px;
                        }

                    }
                    .content{
                        font-size: 16px;
                        line-height: 1.5;
                        margin-bottom: 16px;
                    }

                    .pulished-time{
                        font-size: 12px;
                        color:#A4A4A4;
                    }


                }
            }
        }
    }

}

</style>