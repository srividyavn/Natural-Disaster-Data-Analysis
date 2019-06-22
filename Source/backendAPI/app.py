from flask import Flask, jsonify, abort, request
import pandas as pd
from flask_cors import CORS, cross_origin

def load_data():
  csv_data = pd.read_csv("static/input/Data.csv", sep=',')
  csv_data.set_index("countryName")
  csv_data.sort_values(["countryName"], axis=0,
                   ascending=True, inplace=True)
  return csv_data


def loadEmissionData():
  csv_data = pd.read_csv("static/input/nation.1751_2014_new.csv", sep=',')
  csv_data.set_index("Nation")
  return csv_data

app = Flask(__name__)
CORS(app)

@app.route('/', methods=['GET'])
def display_data():
    data = load_data()
    return data.to_json(orient='records')

@app.route('/api/country/getCountries', methods=['GET'])
def get_countrydata():
    data = load_data()
    countryData = data.countryName.unique()
    frameCountry = pd.DataFrame(countryData)
    # frameCountry = frameCountry.sort_values(by=['countryName'])
    return frameCountry.to_json(orient='records')

@app.route('/api/type/getDisasterType', methods=['GET'])
def get_disasterType():
    data = load_data()
    disasterTypes = data.disasterType.unique()
    frameType = pd.DataFrame(disasterTypes)
    return frameType.to_json(orient='records')

@app.route('/api/year/getYear', methods=['GET'])
def get_year():
    data = load_data()
    yearRange = data.year.unique()
    yearData = pd.DataFrame(yearRange)
    return yearData.to_json(orient='records')

@app.route('/api/country/getCountries/<string:countryName>', methods=['GET'])
def get_disasterData(countryName):
    data = load_data()
    countryData = data[(data['countryName'] == countryName)]
    return countryData.to_json(orient='records')

@app.route('/api/type/getDisasterType/<string:disasterType>', methods=['GET'])
def get_byType(disasterType):
    data = load_data()
    dataByType = data[(data['disasterType'] == disasterType)]
    return dataByType.to_json(orient='records')

@app.route('/api/yearRange', methods=['GET'])
def get_yearData():
    data = load_data()
    from_year = request.args.get('from')
    to_year = request.args.get('to')
    countryName = request.args.get('country')
    disasterType = request.args.get('type')
    rangeData = data[(data['year'].between(int(from_year), int(to_year), inclusive=True)) &
    (data['countryName'] == countryName) & (data['disasterType'] == disasterType)]
    # & (data['disasterType'] == disasterType)
    groupingSum = (rangeData.groupby(['year', 'disasterType'], as_index=False)).sum()
    # grouping = rangeData.groupby(['disasterType', 'year'], as_index=False)
    # print(groupingSum.apply(lambda x: x.to_json(orient='records')))
    return groupingSum.to_json(orient='records')
    # to_json(orient='records')

@app.route('/api/typeCompare', methods=['GET'])
def get_typeCompareData():
    data = load_data()
    from_year = request.args.get('from')
    to_year = request.args.get('to')
    countryName = request.args.get('country')
    rangeData = data[(data['year'].between(int(from_year), int(to_year), inclusive=True)) &
    (data['countryName'] == countryName)]
    # & (data['disasterType'] == disasterType)
    groupingSum = (rangeData.groupby(['year', 'disasterType'], as_index=False)).sum()
    # grouping = rangeData.groupby(['disasterType', 'year'], as_index=False)
    # print(groupingSum.apply(lambda x: x.to_json(orient='records')))
    return groupingSum.to_json(orient='records')
    # to_json(orient='records')


@app.route('/api/countryCompare', methods=['GET'])
def get_countryCompareData():
    data = load_data()
    from_year = request.args.get('from')
    to_year = request.args.get('to')
    fCountryName = request.args.get('FirstCountry')
    sCountryName = request.args.get('SecondCountry')
    disasterType = request.args.get('type')
    rangeData = data[(data['year'].between(int(from_year), int(to_year), inclusive=True)) &
                     ((data['countryName'] == fCountryName) | (data['countryName'] == sCountryName)) &
                     (data['disasterType'] == disasterType)]
    # & (data['disasterType'] == disasterType)
    groupingSum = (rangeData.groupby(['year', 'countryName'], as_index=False)).sum()
    # grouping = rangeData.groupby(['disasterType', 'year'], as_index=False)
    # print(groupingSum.apply(lambda x: x.to_json(orient='records')))
    return groupingSum.to_json(orient='records')
    # to_json(orient='records')

@app.route('/api/countryMap', methods=['GET'])
def get_countryMap():
    data = load_data()
    # disasterType = request.args.get('type')
    # rangeData = data[(data['disasterType'] == disasterType)]
    # & (data['disasterType'] == disasterType)
    groupingSum = (data.groupby(['disasterType', 'countryName'], as_index=False)).sum()
    # grouping = rangeData.groupby(['disasterType', 'year'], as_index=False)
    # print(groupingSum.apply(lambda x: x.to_json(orient='records')))
    return groupingSum.to_json(orient='records')
    # to_json(orient='records')

@app.route('/api/getEmissionData', methods=['GET'])
def get_EmissionData():
    data = loadEmissionData()
    from_year = request.args.get('from')
    to_year = request.args.get('to')
    countryName = request.args.get('countryName')
    rangeData = data[(data['Year'].between(int(from_year), int(to_year), inclusive=True)) & (data['Nation'] == countryName)]
    groupingSum = (rangeData.groupby(['Year', 'Nation'], as_index=False)).sum()
    return groupingSum.to_json(orient='records')

# Emperical View
@app.route('/api/getReportedEvents', methods=['GET'])
def get_ReportedEventData():
    data = load_data()
    # rangeData = data[(data['year'].between(2000, 2018, inclusive=True))]
    groupingSum = (data.groupby(['year'], as_index=False)).sum()
    frameType = pd.DataFrame(groupingSum)
    return frameType.to_json(orient='records')

@app.route('/api/totalDeath', methods=['GET'])
def get_totalDeath():
    data = load_data()
    from_year = request.args.get('from')
    to_year = request.args.get('to')
    rangeData = data[(data['year'].between(int(from_year), int(to_year), inclusive=True))]
    # & (data['disasterType'] == disasterType)
    groupingSum = (rangeData.groupby(['year', 'disasterType'], as_index=False)).sum()
    # grouping = rangeData.groupby(['disasterType', 'year'], as_index=False)
    # print(groupingSum.apply(lambda x: x.to_json(orient='records')))
    return groupingSum.to_json(orient='records')
    # to_json(orient='records')

@app.route('/api/tenDeadliest', methods=['GET'])
def get_tenDeadliestEvent():
    data = load_data()
    data.sort_values(["totalDeaths"], axis=0,
                   ascending=False, inplace=True)
    frameType = pd.DataFrame(data)
    return frameType.to_json(orient='records')

if __name__ == '__main__':
    app.run(debug=True)

@app.route('/api/deadliestEvent', methods=['GET'])
def get_deadliestEvent():
    data = load_data()
    groupingSum = (data.groupby(['disasterType'], as_index=False)).sum()
    groupingSum.sort_values(["totalDeaths"], axis=0,
                     ascending=False, inplace=True)
    frameType = pd.DataFrame(groupingSum)
    return frameType.to_json(orient='records')

@app.route('/api/occuranceEvent', methods=['GET'])
def get_occuranceEvent():
    data = load_data()
    groupingSum = (data.groupby(['disasterType'], as_index=False)).sum()
    groupingSum.sort_values(["occurrence"], axis=0,
                     ascending=False, inplace=True)
    frameType = pd.DataFrame(groupingSum)
    return frameType.to_json(orient='records')

@app.route('/api/topCountries', methods=['GET'])
def get_topCountries():
    data = load_data()
    groupingSum = (data.groupby(['countryName'], as_index=False)).sum()
    groupingSum.sort_values(["occurrence"], axis=0,
                     ascending=False, inplace=True)
    frameType = pd.DataFrame(groupingSum)
    return frameType.to_json(orient='records')

if __name__ == '__main__':
    app.run(debug=True)

  # with open("static/input/Data.csv", "r") as csv_file:
    #     csv_reader = csv.reader(csv_file)
    #     for line in csv_reader:
    #         print(line);
