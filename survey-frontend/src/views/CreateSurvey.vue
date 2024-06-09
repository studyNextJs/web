<template>
  <v-container>
    <v-card>
      <v-card-title>
        <h1>Create a New Survey</h1>
      </v-card-title>
      <v-card-text>
        <form @submit.prevent="createSurvey">
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="Title"
                v-model="survey.title"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-textarea
                label="Description"
                v-model="survey.description"
                rows="4"
              ></v-textarea>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="Password"
                v-model="survey.password"
                type="password"
                required
              ></v-text-field>
            </v-col>
          </v-row>
          <div v-for="(question, qIndex) in survey.questions" :key="qIndex">
            <v-card class="question-card">
              <v-card-title>
                <v-row>
                  <v-col cols="11">
                    <v-text-field
                      label="Question Text"
                      v-model="question.text"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="1">
                    <v-btn icon @click="removeQuestion(qIndex)">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-title>
              <v-card-text>
                <v-select
                  label="Question Type"
                  :items="['text', 'multiple_choice', 'checkbox']"
                  v-model="question.question_type"
                  required
                ></v-select>
                <v-checkbox
                  label="Required"
                  v-model="question.required"
                ></v-checkbox>
                <div v-if="question.question_type === 'multiple_choice' || question.question_type === 'checkbox'">
                  <v-row v-for="(choice, cIndex) in question.choices" :key="cIndex">
                    <v-col cols="10">
                      <v-text-field
                        label="Choice Text"
                        v-model="choice.text"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="2">
                      <v-btn icon @click="removeChoice(qIndex, cIndex)">
                        <v-icon>mdi-delete</v-icon>
                      </v-btn>
                    </v-col>
                  </v-row>
                  <v-btn @click="addChoice(qIndex)" text>Add Choice</v-btn>
                </div>
              </v-card-text>
            </v-card>
          </div>
          <v-row>
            <v-col cols="12">
              <v-btn @click="addQuestion" text>Add Question</v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-btn type="submit" color="primary">Create Survey</v-btn>
            </v-col>
          </v-row>
        </form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      survey: {
        title: '',
        description: '',
        password: '',
        questions: []
      }
    };
  },
  methods: {
    addQuestion() {
      this.survey.questions.push({
        text: '',
        question_type: 'text',
        required: false,
        choices: []
      });
    },
    removeQuestion(index) {
      this.survey.questions.splice(index, 1);
    },
    addChoice(questionIndex) {
      this.survey.questions[questionIndex].choices.push({ text: '' });
    },
    removeChoice(questionIndex, choiceIndex) {
      this.survey.questions[questionIndex].choices.splice(choiceIndex, 1);
    },
    async createSurvey() {
      try {
        const response = await axios.post('https://seulgi97.duckdns.org/polls/surveys/', this.survey);
        const surveyId = response.data.id;
        this.$router.push({ name: 'survey', params: { id: surveyId } });
      } catch (error) {
        console.error('Error creating survey:', error.response.data);
      }
    }
  }
};
</script>

<style scoped>
.question-card {
  margin-bottom: 20px;
}

.v-btn {
  width: 100%;
}

.v-btn.icon {
  min-width: 0;
  padding: 0;
  margin: 0;
}

.v-icon {
  font-size: 18px;
}
</style>
