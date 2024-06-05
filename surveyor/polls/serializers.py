from rest_framework import serializers
from .models import Survey, Question, Choice, Response, Answer

class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = ['id', 'text']

class QuestionSerializer(serializers.ModelSerializer):
    choices = ChoiceSerializer(many=True, required=False)

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
        fields = ['id', 'title', 'description', 'password', 'created_at', 'completed', 'questions']

    def create(self, validated_data):
        questions_data = validated_data.pop('questions', [])
        survey = Survey.objects.create(**validated_data)
        for question_data in questions_data:
            choices_data = question_data.pop('choices', [])
            question = Question.objects.create(survey=survey, **question_data)
            for choice_data in choices_data:
                Choice.objects.create(question=question, **choice_data)
        return survey

    def update(self, instance, validated_data):
        questions_data = validated_data.pop('questions', [])
        instance.title = validated_data.get('title', instance.title)
        instance.description = validated_data.get('description', instance.description)
        instance.password = validated_data.get('password', instance.password)
        instance.completed = validated_data.get('completed', instance.completed)
        instance.save()

        for question_data in questions_data:
            question_id = question_data.get('id')
            if question_id:
                question = Question.objects.get(id=question_id, survey=instance)
                question.text = question_data.get('text', question.text)
                question.question_type = question_data.get('question_type', question.question_type)
                question.required = question_data.get('required', question.required)
                question.save()

                choices_data = question_data.get('choices', [])
                for choice_data in choices_data:
                    choice_id = choice_data.get('id')
                    if choice_id:
                        choice = Choice.objects.get(id=choice_id, question=question)
                        choice.text = choice_data.get('text', choice.text)
                        choice.save()
                    else:
                        Choice.objects.create(question=question, **choice_data)
            else:
                new_question = Question.objects.create(survey=instance, **question_data)
                for choice_data in question_data.get('choices', []):
                    Choice.objects.create(question=new_question, **choice_data)

        return instance

class ResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Response
        fields = '__all__'

class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = '__all__'