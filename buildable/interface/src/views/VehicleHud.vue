<template>
    <n-affix :top="900" style="padding-left: 18vw;" :trigger-top="60">
        <n-space vertical class="container__vehicle-hud">
            <n-button quaternary color="#002025" style="background: rgba(202, 202, 202, 0.179);">
                <template #icon>
                    <n-icon>
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                            viewBox="0 0 512 512">
                            <path
                                d="M425.7 118.25A240 240 0 0 0 76.32 447l.18.2c.33.35.64.71 1 1.05c.74.84 1.58 1.79 2.57 2.78a41.17 41.17 0 0 0 60.36-.42a157.13 157.13 0 0 1 231.26 0a41.18 41.18 0 0 0 60.65.06l3.21-3.5l.18-.2a239.93 239.93 0 0 0-10-328.76zM240 128a16 16 0 0 1 32 0v32a16 16 0 0 1-32 0zM128 304H96a16 16 0 0 1 0-32h32a16 16 0 0 1 0 32zm48.8-95.2a16 16 0 0 1-22.62 0l-22.63-22.62a16 16 0 0 1 22.63-22.63l22.62 22.63a16 16 0 0 1 0 22.62zm149.3 23.1l-47.5 75.5a31 31 0 0 1-7 7a30.11 30.11 0 0 1-35-49l75.5-47.5a10.23 10.23 0 0 1 11.7 0a10.06 10.06 0 0 1 2.3 14zm31.72-23.1a16 16 0 0 1-22.62-22.62l22.62-22.63a16 16 0 0 1 22.63 22.63zm65.88 227.6zM416 304h-32a16 16 0 0 1 0-32h32a16 16 0 0 1 0 32z"
                                fill="currentColor"></path>
                        </svg>
                    </n-icon>
                </template>
                : {{ data.speed.mph }} MP/H
            </n-button>

            <n-button quaternary color="#002025" style="background: rgba(202, 202, 202, 0.179);">
                <template #icon>
                    <n-icon>
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                            viewBox="0 0 24 24">
                            <g fill="none">
                                <path
                                    d="M6.75 3A2.75 2.75 0 0 0 4 5.75V20.5h-.25a.75.75 0 0 0 0 1.5h13.5a.75.75 0 0 0 0-1.5H17v-1.803a2.745 2.745 0 0 0 4-2.442v-5.838a2.75 2.75 0 0 0-.55-1.65L19.35 7.3a.75.75 0 0 0-1.2.9l1.1 1.467c.162.216.25.48.25.75v5.838a1.245 1.245 0 1 1-2.49 0V14.5a.758.758 0 0 0-.01-.121V5.75A2.75 2.75 0 0 0 14.25 3h-7.5zM7 6.75A.75.75 0 0 1 7.75 6h5.5a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-.75.75h-5.5a.75.75 0 0 1-.75-.75v-3.5z"
                                    fill="currentColor"></path>
                            </g>
                        </svg>
                    </n-icon>
                </template>
                : {{ data.fuel.percentage }} %
            </n-button>

            <n-button quaternary color="#002025" style="background: rgba(202, 202, 202, 0.179);">
                <template #icon>
                    <n-icon>
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                            viewBox="0 0 24 24">
                            <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                stroke-linejoin="round">
                                <path d="M3 10v6"></path>
                                <path d="M12 5v3"></path>
                                <path d="M10 5h4"></path>
                                <path d="M5 13H3"></path>
                                <path
                                    d="M6 10h2l2-2h3.382a1 1 0 0 1 .894.553l1.448 2.894a1 1 0 0 0 .894.553H18v-2h2a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-2v-2h-3v2a1 1 0 0 1-1 1h-3.465a1 1 0 0 1-.832-.445L8 16H6v-6z">
                                </path>
                            </g>
                        </svg>
                    </n-icon>
                </template>
                : {{ data.health.engine.percentage }} %
            </n-button>





        </n-space>
    </n-affix>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { NButton, NAffix, NSpace, NIcon } from 'naive-ui'

export default defineComponent({
    components: {
        NButton,
        NAffix,
        NSpace,
        NIcon
    },
    props: {
        data: {
            type: Object,
            default: () => {
                return {
                    speed: {
                        kmh: 0,
                        mph: 0,
                        knots: 0,
                    },
                    fuel: {
                        level: 0,
                        percentage: 0,
                    },
                    health: {
                        engine: {
                            level: 0,
                            percentage: 0,
                        },
                        body: {
                            level: 0,
                            percentage: 0,
                        },
                    }
                }
            }
        }
    }
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap');

@keyframes slide-in {
    0% {
        transform: rotateX(60deg) rotateY(-15deg) translateX(-100%) scale(1, 1);
        opacity: 0;
    }

    100% {
        transform: rotateX(0deg) rotateY(30deg) translateX(0%) scale(1, 1);
        opacity: 1;
    }
}

body {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background: transparent !important;
}

.container__vehicle-hud {
    position: fixed;
    font-family: 'Poppins', sans-serif;
    font-weight: 600;
    transform: rotateX(-15deg) rotateY(30deg) scale(1, 1);
    animation: slide-in 1.5s cubic-bezier(0.16, 1, 0.3, 1);

}</style>
