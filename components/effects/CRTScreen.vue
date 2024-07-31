<!-- https://aleclownes.com/2017/02/01/crt-display.html -->
<script setup lang="ts">
  import gsap from 'gsap'

	onMounted(() => {
		gsap.to('#flashing-light', {
	    opacity: 0,
	    repeat: -1,
	    duration: 0.5,
	    ease: 'power2.in'
	  });
	})
</script>
<style>
  @keyframes flicker {
    0% {
      opacity: 0.27861;
    }
    5% {
      opacity: 0.24769;
    }
    10% {
      opacity: 0.23604;
    }
    15% {
      opacity: 0.30626;
    }
    20% {
      opacity: 0.28128;
    }
    25% {
      opacity: 0.33891;
    }
    30% {
      opacity: 0.25583;
    }
    35% {
      opacity: 0.27807;
    }
    40% {
      opacity: 0.26559;
    }
    45% {
      opacity: 0.34693;
    }
    50% {
      opacity: 0.46019;
    }
    55% {
      opacity: 0.28594;
    }
    60% {
      opacity: 0.20313;
    }
    65% {
      opacity: 0.31988;
    }
    70% {
      opacity: 0.13455;
    }
    75% {
      opacity: 0.27288;
    }
    80% {
      opacity: 0.31428;
    }
    85% {
      opacity: 0.30419;
    }
    90% {
      opacity: 0.3003;
    }
    95% {
      opacity: 0.26108;
    }
    100% {
      opacity: 0.24387;
    }
  }
  @keyframes textShadow {
    0% {
      text-shadow: 0.4389924193300864px 0 1px rgba(0,30,255,0.5), -0.4389924193300864px 0 1px rgba(255,0,80,0.3), 0 0 3px;
    }
    5% {
      text-shadow: 0.7928974010788217px 0 1px rgba(0,30,255,0.5), -0.7928974010788217px 0 1px rgba(255,0,80,0.3), 0 0 3px;
    }
    10% {
      text-shadow: 0.02956275843481219px 0 1px rgba(0,30,255,0.5), -0.02956275843481219px 0 1px rgba(255,0,80,0.3), 0 0 3px;
    }
    15% {
      text-shadow: 0.40218538552878136px 0 1px rgba(0,30,255,0.5), -0.40218538552878136px 0 1px rgba(255,0,80,0.3), 0 0 3px;
    }
    20% {
      text-shadow: 0.4794037899852017px 0 1px rgba(0,30,255,0.5), -0.4794037899852017px 0 1px rgba(255,0,80,0.3), 0 0 3px;
    }
    25% {
      text-shadow: 0.6125630401149584px 0 1px rgba(0,30,255,0.5), -0.6125630401149584px 0 1px rgba(255,0,80,0.3), 0 0 3px;
    }
    30% {
      text-shadow: 0.7015590085143956px 0 1px rgba(0,30,255,0.5), -0.7015590085143956px 0 1px rgba(255,0,80,0.3), 0 0 3px;
    }
    35% {
      text-shadow: 0.896914047650351px 0 1px rgba(0,30,255,0.5), -0.896914047650351px 0 1px rgba(255,0,80,0.3), 0 0 3px;
    }
    40% {
      text-shadow: 0.870905614848819px 0 1px rgba(0,30,255,0.5), -0.870905614848819px 0 1px rgba(255,0,80,0.3), 0 0 3px;
    }
    45% {
      text-shadow: 0.231056963361899px 0 1px rgba(0,30,255,0.5), -0.231056963361899px 0 1px rgba(255,0,80,0.3), 0 0 3px;
    }
    50% {
      text-shadow: 0.08084290417898504px 0 1px rgba(0,30,255,0.5), -0.08084290417898504px 0 1px rgba(255,0,80,0.3), 0 0 3px;
    }
    55% {
      text-shadow: 0.3758461067427543px 0 1px rgba(0,30,255,0.5), -0.3758461067427543px 0 1px rgba(255,0,80,0.3), 0 0 3px;
    }
    60% {
      text-shadow: 0.202193051050636px 0 1px rgba(0,30,255,0.5), -0.202193051050636px 0 1px rgba(255,0,80,0.3), 0 0 3px;
    }
    65% {
      text-shadow: 0.8638780614874975px 0 1px rgba(0,30,255,0.5), -0.8638780614874975px 0 1px rgba(255,0,80,0.3), 0 0 3px;
    }
    70% {
      text-shadow: 0.48874025155497314px 0 1px rgba(0,30,255,0.5), -0.48874025155497314px 0 1px rgba(255,0,80,0.3), 0 0 3px;
    }
    75% {
      text-shadow: 0.8948491305757957px 0 1px rgba(0,30,255,0.5), -0.8948491305757957px 0 1px rgba(255,0,80,0.3), 0 0 3px;
    }
    80% {
      text-shadow: 0.0833037308038857px 0 1px rgba(0,30,255,0.5), -0.0833037308038857px 0 1px rgba(255,0,80,0.3), 0 0 3px;
    }
    85% {
      text-shadow: 0.09769827255241735px 0 1px rgba(0,30,255,0.5), -0.09769827255241735px 0 1px rgba(255,0,80,0.3), 0 0 3px;
    }
    90% {
      text-shadow: 0.443339761481782px 0 1px rgba(0,30,255,0.5), -0.443339761481782px 0 1px rgba(255,0,80,0.3), 0 0 3px;
    }
    95% {
      text-shadow: 0.1841838852799786px 0 1px rgba(0,30,255,0.5), -0.1841838852799786px 0 1px rgba(255,0,80,0.3), 0 0 3px;
    }
    100% {
      text-shadow: 0.6208764473832513px 0 1px rgba(0,30,255,0.5), -0.6208764473832513px 0 1px rgba(255,0,80,0.3), 0 0 3px;
    }
  }
  .crt-screen-inner::-webkit-scrollbar-track {
    background-color: #fff;
    border-radius: 0px;
    width: 7px;
  }
  .crt-screen-inner::-webkit-scrollbar-thumb {
    background-color: #555;
    border-radius: 0px;
    width: 7px;
  }
  .crt-screen-inner::-webkit-scrollbar-thumb:hover {
    background-color: #666;
  }
  .crt-screen::after {
    content: " ";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(18, 16, 16, 0.1);
    opacity: 0;
    z-index: 2;
    pointer-events: none;
    animation: flicker 0.15s infinite;
  }
  .crt-screen::before {
    content: " ";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.06), rgba(0, 255, 0, 0.02), rgba(0, 0, 255, 0.06));
    z-index: 2;
    background-size: 100% 2px, 3px 100%;
    pointer-events: none;
  }
  .crt-screen {
    animation: textShadow 1.6s infinite;
    box-shadow: inset 0 0 10px #000;
  }
</style>
<template>
	<div class="relative bg-cover bg-center bg-no-repeat rounded-2xl shadow-2xl">
	  <div class="relative bg-white crt-screen">
	    <div class="h-[600px] overflow-auto p-4 crt-screen-inner" data-lenis-prevent>
	      This is a computer screen
	    </div>
	  </div>
	</div>
</template>
