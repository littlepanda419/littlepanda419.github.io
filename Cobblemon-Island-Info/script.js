// 獲取當前時間
const currentTime = new Date();

// 定義每個realm的重生時間，以及下一次重生時間
const realms = [
  {
    name: "Sun",
    lastSpawn: new Date(currentTime),
    nextSpawn: new Date(currentTime),
    countdown: 0,
  },
  {
    name: "Moon",
    lastSpawn: new Date(currentTime),
    nextSpawn: new Date(currentTime),
    countdown: 0,
  },
  {
    name: "Star",
    lastSpawn: new Date(currentTime),
    nextSpawn: new Date(currentTime),
    countdown: 0,
  },
  {
    name: "Nether",
    lastSpawn: new Date(currentTime),
    nextSpawn: new Date(currentTime),
    countdown: 0,
  },
  {
    name: "End",
    lastSpawn: new Date(currentTime),
    nextSpawn: new Date(currentTime),
    countdown: 0,
  },
];

// 設定各realm的初始重生時間
realms.forEach((realm) => {
  realm.lastSpawn.setHours(0, 0, 0, 0);
  realm.nextSpawn.setHours(0, 0, 0, 0);
  switch (realm.name) {
    case "Moon":
      realm.lastSpawn.setFullYear(2024, 4);
      realm.lastSpawn.setDate(24);
      realm.lastSpawn.setHours(8, 25);
      realm.lastSpawn.setHours(8, 25);
      break;
    case "Sun":
      realm.lastSpawn.setFullYear(2024, 4);
      realm.lastSpawn.setDate(24);
      realm.lastSpawn.setHours(9, 25);
      break;
    case "Star":
      realm.lastSpawn.setFullYear(2024, 4);
      realm.lastSpawn.setDate(24);
      realm.lastSpawn.setHours(10, 25);
      break;
    case "Nether":
      realm.lastSpawn.setFullYear(2024, 4);
      realm.lastSpawn.setDate(24);
      realm.lastSpawn.setHours(20, 40);
      break;
    case "End":
      realm.lastSpawn.setFullYear(2024, 4);
      realm.lastSpawn.setDate(24);
      realm.lastSpawn.setHours(20, 35);
      break;
  }
});

// 更新下次重生時間和預計時間
function updateSpawnTimes() {
  currentTime.setTime(Date.now());
  realms.forEach((realm) => {
    realm.nextSpawn = new Date(realm.lastSpawn);
    realm.nextSpawn.setHours(realm.nextSpawn.getHours() + 5);
    realm.countdown = Math.floor((realm.nextSpawn - currentTime) / 1000);
    if (realm.countdown < 0) {
      // 若預計剩餘時間為負數，表示已經超過下次重生時間，需要更新重生時間
      const elapsedTime = Math.abs(realm.countdown);
      const spawnInterval = 5 * 60 * 60; // 5 小時的秒數
      const extraSpawns = Math.floor(elapsedTime / spawnInterval);
      realm.lastSpawn.setHours(
        realm.lastSpawn.getHours() + (extraSpawns + 1) * 5
      ); // 更新上次重生時間到正確的時間點
      realm.nextSpawn.setHours(
        realm.nextSpawn.getHours() + (extraSpawns + 1) * 5
      ); // 更新下次重生時間到正確的時間點
      realm.countdown = Math.floor((realm.nextSpawn - currentTime) / 1000);
    }
  });
}

// 顯示倒數計時
function showCountdowns() {
  realms.forEach((realm) => {
    const countdown = realm.countdown;
    const hours = Math.floor(countdown / 3600);
    const minutes = Math.floor((countdown % 3600) / 60);
    const seconds = countdown % 60;
    const formattedCountdown = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    document.getElementById(
      `${realm.name.toLowerCase()}-last-spawn`
    ).textContent = realm.lastSpawn.toLocaleString("zh-TW", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "numeric",
      minute: "numeric",
      hour12: true, // 使用 12 小時制
    });
    document.getElementById(
      `${realm.name.toLowerCase()}-next-spawn`
    ).textContent = realm.nextSpawn.toLocaleString("zh-TW", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "numeric",
      minute: "numeric",
      hour12: true, // 使用 12 小時制
    });

    if (countdown >= 0) {
      document.getElementById(
        `${realm.name.toLowerCase()}-countdown`
      ).textContent = formattedCountdown;
    } else {
      document.getElementById(
        `${realm.name.toLowerCase()}-countdown`
      ).textContent = "已經重生";
    }
  });
}

// 更新下次重生時間和顯示倒數計時
updateSpawnTimes();
showCountdowns();
setInterval(() => {
  currentTime.setTime(currentTime.getTime() + 1000);
  updateSpawnTimes();
  showCountdowns();
}, 1000);

function redirectToCommandsPage() {
  window.location.href = "commands.html";
}

function redirectToMainPage() {
  window.location.href = "index.html";
}

function toggleTable() {
  var table = document.getElementById("table-content");
  if (table.style.display === "none") {
    table.style.display = "block";
  } else {
    table.style.display = "none";
  }
}
