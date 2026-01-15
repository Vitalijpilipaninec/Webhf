function betolt() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "valorantagents.xml", true);
    
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4 && xhr.status == 200) {
            feldolgoz(xhr.responseXML);
        }
    };
    
    xhr.send();
}

function feldolgoz(xml) {
    var jatekosok = xml.getElementsByTagName("jatekos");
    var lista = document.getElementById("lista");
    var lista2020 = document.getElementById("lista2020");
    var controllerLista = document.getElementById("controllerLista");
    
    lista.innerHTML = "";
    lista2020.innerHTML = "";
    controllerLista.innerHTML = "";
    
    var evSzamlalo = {};
    
    for (var i = 0; i < jatekosok.length; i++) {
        var nev = jatekosok[i].getElementsByTagName("nev")[0].textContent;
        var funkcio = jatekosok[i].getElementsByTagName("funkcio")[0].textContent;
        var nemzetiseg = jatekosok[i].getElementsByTagName("nemzetiseg")[0].textContent;
        var ev = jatekosok[i].getElementsByTagName("megjelenes_ev")[0].textContent;
        var fegyver = jatekosok[i].getElementsByTagName("kedvenc_fegyver")[0].textContent;
        
        var li = document.createElement("li");
        li.textContent = nev + " - " + funkcio + " - " + nemzetiseg + " (" + ev + ")";
        lista.appendChild(li);
        
        if (ev == "2020") {
            var li2020 = document.createElement("li");
            li2020.textContent = nev + " - " + funkcio;
            lista2020.appendChild(li2020);
        }
        
        if (funkcio == "Controller") {
            var liController = document.createElement("li");
            liController.textContent = nev + " - " + nemzetiseg + " - " + fegyver;
            controllerLista.appendChild(liController);
        }
        
        if (ev in evSzamlalo) {
            evSzamlalo[ev] = evSzamlalo[ev] + 1;
        } else {
            evSzamlalo[ev] = 1;
        }
    }
    
    var legkevesebbEv = "";
    var legkevesebbSzam = 1000;
    
    for (var ev in evSzamlalo) {
        if (evSzamlalo[ev] < legkevesebbSzam) {
            legkevesebbEv = ev;
            legkevesebbSzam = evSzamlalo[ev];
        }
    }
    
    if (legkevesebbEv != "") {
        var legkevesebbDiv = document.createElement("div");
        legkevesebbDiv.innerHTML = "<h3>" + legkevesebbEv + " évben jelent meg a legkevesebb játékos</h3>";
        legkevesebbDiv.innerHTML += "<p>Ebben az évben ezek a játékosok jelentek meg:</p>";
        
        var ul = document.createElement("ul");
        
        for (var i = 0; i < jatekosok.length; i++) {
            var nev = jatekosok[i].getElementsByTagName("nev")[0].textContent;
            var ev = jatekosok[i].getElementsByTagName("megjelenes_ev")[0].textContent;
            
            if (ev == legkevesebbEv) {
                var li = document.createElement("li");
                li.textContent = nev;
                ul.appendChild(li);
            }
        }
        
        legkevesebbDiv.appendChild(ul);
        document.body.appendChild(legkevesebbDiv);
    }
}