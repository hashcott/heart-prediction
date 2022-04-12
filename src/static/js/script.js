$(document).ready(() => {
  $("#formIndex").on("submit", async (e) => {
    e.preventDefault();
    let data = [
      {
        Sex_M: 0,
        ChestPainType_ATA: 0,
        ChestPainType_NAP: 0,
        ChestPainType_TA: 0,
        RestingECG_Normal: 0,
        RestingECG_ST: 0,
        ExerciseAngina: 0,
        ST_Slope_Flat: 0,
        ST_Slope_Up: 0,
        Age: 0,
        RestingBP: 0,
        Cholesterol: 0,
        FastingBS: 0,
        MaxHR: 0,
        Oldpeak: 0,
      },
    ];
    data[0].Sex_M = parseInt($("input[name='sex']:checked").val());
    data[0].FastingBS = parseInt($("input[name='fbs']:checked").val());
    const cptRaw = parseInt($("#cpt").val());
    switch (cptRaw) {
      case 1:
        data[0].ChestPainType_ATA = 1;
        break;
      case 2:
        data[0].ChestPainType_NAP = 1;
        break;
      case 4:
        data[0].ChestPainType_TA = 1;
        break;
      default:
        break;
    }
    const recgRaw = parseInt($("#recg").val());
    switch (recgRaw) {
      case 1:
        data[0].RestingECG_Normal = 1;
        break;
      case 2:
        data[0].RestingECG_ST = 1;
        break;
      default:
        break;
    }
    data[0].ExerciseAngina = parseInt($("input[name='ea']:checked").val());
    const stlRaw = parseInt($("#stl").val());
    switch (stlRaw) {
      case 1:
        data[0].ST_Slope_Up = 1;
        break;
      case 2:
        data[0].ST_Slope_Flat = 1;
        break;
      default:
        break;
    }
    data[0].Age = parseInt($("#ageInput").val());
    data[0].RestingBP = parseInt($("#restingBPInput").val());
    data[0].Cholesterol = parseInt($("#cholesterol").val());
    data[0].MaxHR = parseInt($("#maxHr").val());
    data[0].Oldpeak = parseFloat($("#oldPeak").val());

    const res = await fetch("/analysis", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const resData = await res.json();
    const myModal = new bootstrap.Modal(document.getElementById("result"), {});
    if (resData == 1) {
      $("#bodyResult").html(`
    <div class="alert alert-warning d-flex align-items-center" role="alert">
      <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Warning:"><use xlink:href="#exclamation-triangle-fill"/></svg>
      <div>
        Cảnh báo bạn đang có nguy cơ cao bị đau tim (đột quỵ) <br/>
        Hãy điều chỉnh chế độ sinh hoạt, ăn uống lành mạnh và chăm tập thể dục để có sức khoẻ tốt nhé.
      </div>
    </div>`);
    } else if (resData == 0) {
      $("#bodyResult").html(`
      <div class="alert alert-success d-flex align-items-center" role="alert">
        <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Success:"><use xlink:href="#check-circle-fill"/></svg>
        <div>
        Bạn đang có một trái tim khoẻ mạnh. <br/>
        Tuy nhiên bạn vẫn cần phải có chế độ sinh hoạt, ăn uống lành mạnh và chăm tập thể dục để có sức khoẻ tốt nhé.
        </div>    
      </div>`);
    }
    myModal.show();
  });
});
