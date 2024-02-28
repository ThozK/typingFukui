const canvas = document.getElementById('timelineCanvas');
const ctx = canvas.getContext('2d');

const startYear = 1895;
const endYear = 1999;
const timelineLength = endYear - startYear;
const canvasWidth = canvas.width;
const canvasHeight = canvas.height;
const yearStep = 10;
const circleRadius = 5;
const highlightDuration = 1500; // milliseconds

function drawTimeline() {
    // Clear canvas
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // Draw timeline
    ctx.beginPath();
    ctx.moveTo(0, canvasHeight / 2);
    ctx.lineTo(canvasWidth, canvasHeight / 2);
    ctx.strokeStyle = "white";
    ctx.stroke();

    // Draw circles for special years
    const specialYears = yearList;
    ctx.fillStyle = 'yellow';
    specialYears.forEach(year => {
        const x = mapYearToX(year);
        ctx.beginPath();
        ctx.arc(x, canvasHeight / 2, circleRadius, 0, Math.PI * 2);
        ctx.fill();
    });

    // Draw tick marks for every 10 years and text legend
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.font = '12px Arial';
    for (let year = startYear + 5; year <= endYear; year += yearStep) {
        const x = mapYearToX(year);
        ctx.fillRect(x - 1, canvasHeight / 2 - 5, 2, 10);
        ctx.fillText(year.toString(), x, canvasHeight / 2 + 20);
    }
}

function mapYearToX(year) {
    return ((year - startYear) / timelineLength) * canvasWidth;
}

function highlightYear(year) {
    const x = mapYearToX(year);
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    drawTimeline();
    drawHighlight(x);
}

function drawHighlight(x) {
    let start = null;
    function animate(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        drawTimeline();
        if (progress < highlightDuration) {
            const color = `rgba(255, 57, 57, ${1.5*progress / highlightDuration})`; // Red with opacity gradient
            ctx.fillStyle = color;
            ctx.beginPath();
            ctx.arc(x, canvasHeight / 2, circleRadius * 2, 0, Math.PI * 2);
            ctx.fill();
            requestAnimationFrame(animate);
        }else {
            start = null;
            drawHighlight(x);
        }
    }
    requestAnimationFrame(animate);
}
drawTimeline();