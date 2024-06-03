

from django import forms
from .models import Survey, Question, Choice, Response, Answer

class SurveyForm(forms.ModelForm):
    class Meta:
        model = Survey
        fields = ['title', 'description']

class QuestionForm(forms.ModelForm):
    class Meta:
        model = Question
        fields = ['text', 'question_type', 'required']

class ChoiceForm(forms.ModelForm):
    class Meta:
        model = Choice
        fields = ['text']

class ResponseForm(forms.ModelForm):
    class Meta:
        model = Response
        fields = []

class AnswerForm(forms.ModelForm):
    class Meta:
        model = Answer
        fields = ['text']
