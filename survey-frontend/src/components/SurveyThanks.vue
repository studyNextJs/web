<template>
  <v-container>
    <v-card class="thanks-card">
      <v-card-title>
        <h1>Thank you for your response!</h1>
      </v-card-title>
      <v-card-text>
        <router-link to="/">
          <v-btn color="primary" class="mx-2" @click="goToHome">Back to Surveys</v-btn>
        </router-link>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
export default {
  methods: {
    goToHome() {
      this.$router.push('/');
    }
  }
};
</script>

<style scoped>
.thanks-card {
  text-align: center;
  padding: 20px;
  margin-top: 50px;
}

.v-btn {
  margin-top: 20px;
}
</style>
