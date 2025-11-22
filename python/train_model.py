"""
PhishGuard AI - ML Model Training Script
Trains a phishing detection model on the provided dataset
"""

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, confusion_matrix
from sklearn.preprocessing import StandardScaler
import joblib
import json

# Load dataset
print("📊 Loading phishing dataset...")
df = pd.read_csv('../phishing.csv')

print(f"Dataset shape: {df.shape}")
print(f"Class distribution:\n{df['class'].value_counts()}")

# Separate features and target
X = df.drop(['Index', 'class'], axis=1, errors='ignore')
y = df['class']

# Convert -1 to 0 for binary classification
y = (y == 1).astype(int)

print(f"\nFeatures: {X.columns.tolist()}")
print(f"Samples: {len(X)}")
print(f"Phishing: {sum(y)}, Legitimate: {len(y) - sum(y)}")

# Split dataset
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

print(f"\nTraining set: {len(X_train)}")
print(f"Testing set: {len(X_test)}")

# Scale features
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# Train multiple models
models = {
    'RandomForest': RandomForestClassifier(
        n_estimators=200,
        max_depth=20,
        min_samples_split=10,
        random_state=42,
        n_jobs=-1
    ),
    'GradientBoosting': GradientBoostingClassifier(
        n_estimators=100,
        learning_rate=0.1,
        max_depth=5,
        random_state=42
    ),
    'LogisticRegression': LogisticRegression(
        max_iter=1000,
        random_state=42,
        C=0.1
    )
}

print("\n🤖 Training models...")
print("="*60)

results = {}

for name, model in models.items():
    print(f"\nTraining {name}...")
    
    # Train
    if name == 'LogisticRegression':
        model.fit(X_train_scaled, y_train)
        y_pred = model.predict(X_test_scaled)
    else:
        model.fit(X_train, y_train)
        y_pred = model.predict(X_test)
    
    # Evaluate
    accuracy = accuracy_score(y_test, y_pred)
    precision = precision_score(y_test, y_pred)
    recall = recall_score(y_test, y_pred)
    f1 = f1_score(y_test, y_pred)
    
    results[name] = {
        'accuracy': accuracy,
        'precision': precision,
        'recall': recall,
        'f1': f1
    }
    
    print(f"✓ Accuracy:  {accuracy*100:.2f}%")
    print(f"✓ Precision: {precision*100:.2f}%")
    print(f"✓ Recall:    {recall*100:.2f}%")
    print(f"✓ F1 Score:  {f1*100:.2f}%")
    
    # Confusion matrix
    cm = confusion_matrix(y_test, y_pred)
    print(f"\nConfusion Matrix:")
    print(f"TN: {cm[0][0]}, FP: {cm[0][1]}")
    print(f"FN: {cm[1][0]}, TP: {cm[1][1]}")

# Select best model
best_model_name = max(results, key=lambda x: results[x]['accuracy'])
best_model = models[best_model_name]

print("\n" + "="*60)
print(f"🏆 Best Model: {best_model_name}")
print(f"   Accuracy: {results[best_model_name]['accuracy']*100:.2f}%")
print("="*60)

# Save model
print("\n💾 Saving model...")
joblib.dump(best_model, 'phishguard_model.pkl')
joblib.dump(scaler, 'feature_scaler.pkl')

# Save feature names
with open('feature_names.json', 'w') as f:
    json.dump(X.columns.tolist(), f)

# Save model metadata
metadata = {
    'model_type': best_model_name,
    'accuracy': results[best_model_name]['accuracy'],
    'precision': results[best_model_name]['precision'],
    'recall': results[best_model_name]['recall'],
    'f1_score': results[best_model_name]['f1'],
    'training_samples': len(X_train),
    'testing_samples': len(X_test),
    'features': X.columns.tolist()
}

with open('model_metadata.json', 'w') as f:
    json.dump(metadata, f, indent=2)

print("✅ Model saved successfully!")
print(f"   - phishguard_model.pkl")
print(f"   - feature_scaler.pkl")
print(f"   - feature_names.json")
print(f"   - model_metadata.json")

# Feature importance (for tree-based models)
if hasattr(best_model, 'feature_importances_'):
    print("\n📊 Top 10 Most Important Features:")
    feature_importance = pd.DataFrame({
        'feature': X.columns,
        'importance': best_model.feature_importances_
    }).sort_values('importance', ascending=False)
    
    for idx, row in feature_importance.head(10).iterrows():
        print(f"   {row['feature']}: {row['importance']:.4f}")

print("\n🎉 Training complete!")
print("\nNext steps:")
print("1. Test the model with: python test_model.py")
print("2. Convert to TensorFlow.js for browser use")
print("3. Integrate with the Chrome extension")
