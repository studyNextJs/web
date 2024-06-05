<template>
  <v-app>
    <v-main>
      <v-container fluid>
        <v-row justify="center">
          <v-col cols="12">
            <v-card class="pa-5" color="primary">
              <v-card-title class="white--text">Welcome to the Home Page</v-card-title>
              <v-card-text class="white--text">
                <SurveyList />
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import SurveyList from '@/components/SurveyList.vue';

export default {
  name: 'HomeView',
  components: {
    SurveyList
  }
};
</script>

<style scoped>
.v-card {
  max-width: 600px;
  margin: auto;
}
</style>
