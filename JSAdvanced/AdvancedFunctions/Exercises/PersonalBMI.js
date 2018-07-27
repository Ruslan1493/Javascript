function result() {
    //let tokens = arguments.split(', ');
    let name = arguments[0].replace(/[\“\”]+/g, '');
    let age = +arguments[1];
    let weigth = +arguments[2];
    let height= +arguments[3];
    let heigthInMeters = height / 100;
    let bmi = Math.round(weigth / (heigthInMeters * heigthInMeters));
    let chart = {};
    chart.name = name;
    chart.personalInfo =
        {
            age: age,
            weight: weigth,
            height: height

        }
    chart.BMI = bmi;
    let status = 'underweight';
    if(bmi >= 18.5 && bmi < 25){
        status = 'normal';
    }else if(bmi >= 25 && bmi < 30){
        status = 'overweight';
    }else if(bmi >= 30){
        status = 'obese';
    }
    chart.status = status;
    if(status === 'obese'){
        chart.recommendation = 'admission required';
    }
    return chart;

}

result('“Peter”', 29, 75, 182);
result('“Honey Boo Boo”', 9, 57, 137);