<template>
  <v-container>
    <v-card>
      <v-card-title>
        <h1>Question Manager</h1>
      </v-card-title>
      <v-card-text>
        <p>Manage your surveys here.</p>
        <v-row>
          <v-col v-for="survey in surveys" :key="survey.id" cols="12" md="6">
            <v-card
              class="ma-3"
              :class="{ 'completed-survey': survey.completed }"
              @click="openPasswordDialog(survey)"
            >
              <v-card-title>{{ survey.title }}</v-card-title>
              <v-card-subtitle>{{ survey.description }}</v-card-subtitle>
            </v-card>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <!-- Password Dialog -->
    <v-dialog v-model="passwordDialog" max-width="500px">
      <v-card>
        <v-card-title>Enter Password</v-card-title>
        <v-card-text>
          <v-text-field
            v-model="password"
            label="Password"
            type="password"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="verifyPassword">Submit</v-btn>
          <v-btn color="secondary" @click="passwordDialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  name: 'QuestionManager',
  data() {
    return {
      surveys: [],
      passwordDialog: false,
      selectedSurvey: null,
      password: '',
    };
  },
  created() {
    this.fetchSurveys();
  },
  methods: {
    fetchSurveys() {
      axios.get('https://seulgi97.duckdns.org/polls/surveys/')
        .then(response => {
          console.log(response.data); // 받아온 데이터를 콘솔에 출력하여 확인
          this.surveys = response.data;
        })
        .catch(error => {
          console.error('Error fetching surveys:', error);
        });
    },
    openPasswordDialog(survey) {
      this.selectedSurvey = survey;
      this.passwordDialog = true;
    },
    verifyPassword() {
      if (this.password === this.selectedSurvey.password) {
        this.$router.push({ name: 'question-edit', params: { id: this.selectedSurvey.id } });
      } else {
        alert('Incorrect password. Please try again.');
      }
    },
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    }
  }
};
</script>

<style scoped>
.v-card {
  margin-top: 20px;
  cursor: pointer;
}

.completed-survey {
  background-color: #C5CAE9 !important;
}
</style>


<style scoped>
.v-card {
  cursor: pointer;
  transition: box-shadow 0.3s ease;
}

.v-card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.survey-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 16px;
  background-color: #fff;
  border-left: 5px solid #1E88E5;
}

.completed-survey {
  background-color: #C5CAE9 !important;
  border-left-color: #3949AB;
}

.v-card-title {
  font-weight: bold;
  font-size: 1.2em;
}

.v-card-subtitle {
  color: #757575;
  margin-bottom: 10px;
}

.v-card-text {
  margin-top: auto;
  font-size: 0.9em;
  color: #616161;
}

.v-dialog {
  border-radius: 8px;
}

.v-btn {
  margin: 5px;
}
</style>
