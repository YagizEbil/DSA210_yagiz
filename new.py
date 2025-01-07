import pandas as pd
import glob
import folium
from folium.plugins import HeatMap
import matplotlib.pyplot as plt
import random
import gradio as gr
import scipy.stats as stats
import seaborn as sns

# Load each .csv folder to combined df
folder_path = "data"
files = glob.glob(f"{folder_path}/*.csv")

dataframes_dict = {}

for file in files:
    df = pd.read_csv(file, delimiter=';')
    date = file.split('/')[-1].split(' ')[0]
    time = file.split('/')[-1].split(' ')[1].split('.')[0]
    print(f"Loaded file: {file}")
    dataframes_dict[f"{date} {time}"] = df

combined_df = pd.concat(dataframes_dict.values(), ignore_index=True)

# Ensure the necessary columns are present and correctly formatted
df = dataframes_dict['2024-12-14 07-53-22']
df['VALUE'] = pd.to_numeric(df['VALUE'], errors='coerce')
df['SECONDS'] = pd.to_numeric(df['SECONDS'], errors='coerce')
df['PID'] = df['PID'].astype(str)

# Create an array that stores each PID then create a dictionary that stores each PID and its corresponding values with seconds
PID = df['PID'].unique()
PID_dict = {}
for i in PID:
    PID_dict[i] = pd.Series(df[df['PID'] == i]['VALUE'].values, index=df[df['PID'] == i]['SECONDS'])

# Create a map view of the data using the location data and the folium library
m = folium.Map(location=[df['LATITUDE'].mean(), df['LONGTITUDE'].mean()], zoom_start=12)
heat_data = [[row['LATITUDE'], row['LONGTITUDE']] for index, row in df.iterrows()]
HeatMap(heat_data).add_to(m)
m.save('map.html')

# If the df has a column with Latitude and Longitude, add it to the map and create a combined map with all the data
m = folium.Map(location=[df['LATITUDE'].mean(), df['LONGTITUDE'].mean()], zoom_start=15)
for date_time, df in dataframes_dict.items():
    if 'LATITUDE' in df.columns and 'LONGTITUDE' in df.columns:
        heat_data = [[row['LATITUDE'], row['LONGTITUDE']] for index, row in df.iterrows()]
        HeatMap(heat_data).add_to(m)
m.save('map_all.html')

# Create a graph for PID = PID
print("Initial DataFrame:\n", df.head())
df['VALUE'] = pd.to_numeric(df['VALUE'], errors='coerce')
df['SECONDS'] = pd.to_numeric(df['SECONDS'], errors='coerce')
df['PID'] = df['PID'].astype(str)
df['VALUE'] = df['VALUE'].astype(float)
df['SECONDS'] = df['SECONDS'].astype(float)

i = 'Speed (GPS)'
df = pd.DataFrame(PID_dict[i])
plt.plot((PID_dict[i].index - PID_dict[i].index[0])/60, PID_dict[i].values, label=i)
plt.xlabel('Time')
plt.ylabel(i)
plt.title(i + ' over time')
plt.show()

# Plot values for two PIDs
df = dataframes_dict['2024-12-14 07-53-22']
num = 0
for pid in PID:
    print(num)
    print(pid)
    num += 1

check_one = PID[0]
check_two = PID[1]
one = df[df['PID'] == check_one]
two = df[df['PID'] == check_two]

one = one.reset_index(drop=True)
two = two.reset_index(drop=True)

one['VALUE'] = pd.to_numeric(one['VALUE'], errors='coerce').fillna(0)
two['VALUE'] = pd.to_numeric(two['VALUE'], errors='coerce').fillna(0)

while len(one) > len(two):
    one = one.drop(one.index[1]).reset_index(drop=True)
while len(two) > len(one):
    random_index = random.randint(0, len(two)-2)
    two = two.drop(two.index[random_index+1]).reset_index(drop=True)

plt.plot(one['VALUE'], label=check_one)
plt.plot(two['VALUE'], label=check_two)
plt.xlabel('Index')
plt.ylabel('Value')
plt.title(f"{check_one} vs {check_two}")
plt.legend()
plt.show()

plt.scatter(one['VALUE'], two['VALUE'])
plt.xlabel(check_one)
plt.ylabel(check_two)
plt.title(f"{check_one} vs {check_two}")
plt.show()

# Generate Gradio interface
def plot_values(PID1, PID2):
    one = df[df['PID'] == PID1]
    two = df[df['PID'] == PID2]
    one = one.reset_index(drop=True)
    two = two.reset_index(drop=True)
    one['VALUE'] = pd.to_numeric(one['VALUE'], errors='coerce').fillna(0)
    two['VALUE'] = pd.to_numeric(two['VALUE'], errors='coerce').fillna(0)
    while len(one) > len(two):
        one = one.drop(one.index[1]).reset_index(drop=True)
    while len(two) > len(one):
        random_index = random.randint(0, len(two)-2)
        two = two.drop(two.index[random_index+1]).reset_index(drop=True)
    plt.plot(one['VALUE'], label=PID1)
    plt.plot(two['VALUE'], label=PID2)
    plt.xlabel('Index')
    plt.title(f"{PID1} vs {PID2}")
    plt.legend()
    plt.show()
    plt.scatter(one['VALUE'], two['VALUE'])
    plt.xlabel(PID1)
    plt.ylabel(PID2)
    plt.title(f"{PID1} vs {PID2}")
    plt.show()

PID1 = gr.Dropdown(list(PID), label="PID1")
PID2 = gr.Dropdown(list(PID), label="PID2")

gr.Interface(plot_values, [PID1, PID2], "plot").launch()

# Create a hypothesis test for the data
def t_test(PID1, PID2):
    one = df[df['PID'] == PID1]
    two = df[df['PID'] == PID2]
    one = one.reset_index(drop=True)
    two = two.reset_index(drop=True)
    one['VALUE'] = pd.to_numeric(one['VALUE'], errors='coerce').fillna(0)
    two['VALUE'] = pd.to_numeric(two['VALUE'], errors='coerce').fillna(0)
    while len(one) > len(two):
        one = one.drop(one.index[1]).reset_index(drop=True)
    while len(two) > len(one):
        random_index = random.randint(0, len(two)-2)
        two = two.drop(two.index[random_index+1]).reset_index(drop=True)
    t_stat, p_value = stats.ttest_ind(one['VALUE'], two['VALUE'])
    return p_value

gr.Interface(t_test, [PID1, PID2], "number").launch()

# Create correlation matrix for each PID
correlation_each_pid = {}
for pid in PID:
    one = df[df['PID'] == pid]
    one = one.reset_index(drop=True)
    one['VALUE'] = pd.to_numeric(one['VALUE'], errors='coerce').fillna(0)
    one['SECONDS'] = pd.to_numeric(one['SECONDS'], errors='coerce').fillna(0)
    correlation_each_pid[pid] = one.corr()

# Plot the correlation matrix
sns.heatmap(correlation_each_pid, annot=True)
plt.title("Correlation Matrix")
plt.show()
