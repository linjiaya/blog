<template>
  <div class="profile">
    <img src="https://eliaztray.github.io/blog/avatar/Rita.jpg" alt="" class="profile-avatar">
    <div class="profile-name">EliazTray</div>
    <div class="profile-signature">witness me</div>
    <div class="profile-social">

      <a href="" class="icon-link" title="email" v-for="(name, index) in social" :key="index">
        <e-svg :name="name"></e-svg>
      </a>
    </div>
    <div class="friends">
      <div>Friends</div>
      <span><a href="" target="_blank">friendA</a></span>
      <span><a href="" target="_blank">friendB</a></span>
    </div>
    <div class="about-me">
      <a href="">ABOUT ME</a>
    </div>
  </div>
</template>

<script>
import eSvg from './e-svg'
export default {
  name: 'e-profile',
  components: {
    eSvg
  },
  data() {
    return {
      social: ['email', 'github', 'wechat']
    }
  }
}
</script>

<style lang="scss">
.profile {
  width: 200px;
  font: torem(16px) 'Oswald-Regular';

  .profile-avatar {
    display: block;
    width: 100%;
    border-radius: torem(16px);
    box-shadow: 0 0 2px 0 rgba(#000, 0.6);
  }

  .profile-name {
    font-size: torem(32px);
    line-height: torem(48px);
    padding: torem(8px) 0 0 0;
    color: #333;
    text-align: center;
  }

  .profile-signature {
    font-size: torem(16px);
    text-align: center;
  }

  .profile-social {
    display: flex;
    // justify-content: center;
    align-items: center;
    padding: torem(8px) 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }
  .icon-link {
    display: inline-block;
    width: torem(24px);
    margin: 0 torem(10px) 0 0;
    cursor: pointer;

    &:hover {
      color: #0cb49d;
    }
  }

  .friends {
    padding: torem(8px) 0;
    border-bottom: 1px solid rgba(#000, 0.1);

    a {
      margin-right: torem(8px);
    }
  }

  .about-me {
    padding: torem(8px) 0;
    border-bottom: 1px solid rgba(#000, 0.1);

    a {
      font-size: torem(18px);
      font-weight: bold;
    }
  }
}
</style>
