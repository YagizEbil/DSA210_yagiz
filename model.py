import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from sklearn.preprocessing import StandardScaler
import glob

folder_path = "data"
files = glob.glob(f"{folder_path}/*.csv")

dataframes_dict = {}  

for file in files:
    df = pd.read_csv(file, delimiter=';')
    date = file.split('/')[-1].split(' ')[0]
    time = file.split('/')[-1].split(' ')[1].split('.')[0]
    df['TimeStamp'] = f"{date} {time}"  # Create 'TimeStamp' column
    dataframes_dict[f"{date} {time}"] = df

combined_df = pd.concat(dataframes_dict.values(), ignore_index=True)

# Preprocessing: Clean data
cleared_df = combined_df.drop(columns=['Unnamed: 4', "Unnamed: 6", "LATITUDE", "LONGTITUDE", "SECONDS"])
pid_list = [
    'Vehicle speed', 'Engine RPM', 'Engine coolant temperature', 'Throttle position',
    'Intake manifold absolute pressure', 'Timing advance', 'Vehicle acceleration',
    'Calculated engine load value', 'Calculated instant fuel rate', 'Fuel used',
    'Fuel economizer (based on fuel system status and throttle position)'
]
cleared_df = cleared_df[cleared_df['PID'].isin(pid_list)]

# Pivot data for modeling: Convert PID-based structure into feature columns
pivot_df = cleared_df.pivot_table(values='VALUE', index='TimeStamp', columns='PID', aggfunc='mean').reset_index()
pivot_df.dropna(inplace=True)  # Drop rows with missing values

# Feature engineering
pivot_df['Engine RPM x1000'] = pivot_df['Engine RPM'] / 1000
pivot_df['Instant engine power'] = pivot_df['Calculated engine load value'] * pivot_df['Engine RPM'] / 5252

# Define features (X) and target variable (y)
target_variable = 'Calculated instant fuel rate'
features = [col for col in pivot_df.columns if col not in ['TimeStamp', target_variable]]

X = pivot_df[features]
y = pivot_df[target_variable]

# Scale features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)

# Initialize and train the model
rf = RandomForestRegressor(random_state=42)
rf.fit(X_train, y_train)

# Evaluate the model
y_pred = rf.predict(X_test)
mae = mean_absolute_error(y_test, y_pred)
rmse = np.sqrt(mean_squared_error(y_test, y_pred))
r2 = r2_score(y_test, y_pred)

print(f"Model Performance:")
print(f"Mean Absolute Error (MAE): {mae}")
print(f"Root Mean Squared Error (RMSE): {rmse}")
print(f"R-squared (R2): {r2}")

# Hyperparameter tuning (Optional)
param_grid = {
    'n_estimators': [100, 200, 300],
    'max_depth': [10, 20, 30, None],
    'min_samples_split': [2, 5, 10],
    'min_samples_leaf': [1, 2, 4]
}
grid_search = GridSearchCV(estimator=rf, param_grid=param_grid, cv=3, n_jobs=-1, scoring='r2')
grid_search.fit(X_train, y_train)

# Best model
best_rf = grid_search.best_estimator_
y_pred_best = best_rf.predict(X_test)
best_r2 = r2_score(y_test, y_pred_best)

print(f"Best R-squared after tuning: {best_r2}")

# Feature importance
importances = best_rf.feature_importances_
feature_importance_df = pd.DataFrame({'Feature': features, 'Importance': importances}).sort_values(by='Importance', ascending=False)

print("\nFeature Importances:")
print(feature_importance_df)

# Save the model and scaler
import joblib
joblib.dump(best_rf, 'random_forest_model.pkl')
joblib.dump(scaler, 'scaler.pkl')

# Predict on new data (example)
def predict_new_data(new_data):
    new_data_df = pd.DataFrame(new_data, columns=features)  # Create DataFrame with feature names
    new_data_scaled = scaler.transform(new_data_df)
    predictions = best_rf.predict(new_data_scaled)
    return predictions

# Example usage
new_data_example = np.array([[60, 2500, 90, 50, 100, 20, 1, 80, 0.5, 10, 5, 80 * 2500 / 5252]])
predictions_example = predict_new_data(new_data_example)
print(f"Predicted instant fuel rate: {predictions_example[0]}")
