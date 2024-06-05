from rest_framework import serializers
from .models import Survey, Question, Choice, Response, Answer

class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = ['id', 'text']

class QuestionSerializer(serializers.ModelSerializer):
    choices = ChoiceSerializer(many=True, required=False)
    survey = serializers.PrimaryKeyRelatedField(queryset=Survey.objects.all())

    class Meta:
        model = Question
        fields = ['id', 'text', 'question_type', 'required', 'choices', 'survey']

    def create(self, validated_data):
        choices_data = validated_data.pop('choices', [])
        question = Question.objects.create(**validated_data)
        for choice_data in choices_data:
            Choice.objects.create(question=question, **choice_data)
        return question

class SurveySerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, required=False)

    class Meta:
        model = Survey
        fields = ['id', 'title', 'description', 'password', 'created_at', 'questions','completed']

    def create(self, validated_data):
        questions_data = validated_data.pop('questions', [])
        survey = Survey.objects.create(**validated_data)
        for question_data in questions_data:
            choices_data = question_data.pop('choices', [])
            question = Question.objects.create(survey=survey, **question_data)
            for choice_data in choices_data:
                Choice.objects.create(question=question, **choice_data)
        return survey

class ResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Response
        fields = '__all__'

class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = '__all__'
