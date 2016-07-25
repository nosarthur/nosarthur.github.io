---
layout: post
title: Kaggle titanic challenge 
date:   2016-07-19 13:43:08 -0500
categories: [side project]
comments: true
tags: [logistic regression, pandas]
---

```python
titanic = pandas.read_csv("titanic_train.csv")
print(titanic.describe())

```

```python

titanic['Age'].fillna(titanic['Age'].median(), inplace=True)
titanic['Embarked'].fillna('S', inplace=True)

# map strings to numbers 
# let's do one-hot-encoding instead

e_map = {'S':0, 'C':1, 'Q':2}
s_map = {'male':0, 'female':1}

titanic['Embarked'] = titanic['Embarked'].map(e_map)
titanic['Sex'] = titanic['Sex'].map(s_map)
```



```python
from sklearn import cross_validation
from sklearn.linear_model import LogisticRegression

predictors = ["Pclass", "Sex", "Age", "SibSp", "Parch", "Fare", "Embarked"]
alg = LogisticRegression(random_state=1)

# Compute the accuracy score for all the cross validation folds.  (much simpler than what we did before!)
scores = cross_validation.cross_val_score(alg, titanic[predictors], titanic["Survived"], cv=3)

# Take the mean of the scores (because we have one for each fold)
print(scores.mean())


```
