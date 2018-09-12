function unnest(boxName, avatarsize, showcolons, wrapclass, addnewname, openintab) {
	document.addEventListener("DOMContentLoaded",function(){
	let host = String(window.location.hostname.split(".").slice(0, -2));
		
	let containsPost = function(elem) {
		if (elem.children.length>1 && elem.children[1].children.length>0){
			let e = elem.children[1].children[0];
			return (e.children.length>0 && e.children[0].classList.contains("tumblr_blog"));
		} else { return false; }
	}
	
	let makeName = function(elem) {
		if(typeof elem === "string"){
			let e = document.createElement("p");
			document.body.appendChild(e);
			e.innerHTML="<a href='http://"+elem+".tumblr.com>"+elem+"</a>:";
			let a = document.createElement("a");
			a.setAttribute("href","http://"+elem+".tumblr.com");
			a.appendChild(document.createTextNode(elem));
			e.appendChild(a);
			if(showcolons){
				e.appendChild(document.createTextNode(":"));
			}
			elem = e;
		} else if (!showcolons){
			elem.innerHTML = elem.innerHTML.slice(0, -1);
		}
		elem.className="tumblr_blog";
			elem.children[0].removeAttribute("class");
			if(openintab){
				elem.children[0].setAttribute("target","_blank");
			}
			if (avatarsize > 0) {
				let bUrl = elem.children[0].innerHTML;
				let e = document.createElement("img");
				e.setAttribute("src","http://api.tumblr.com/v2/blog/" + bUrl + "/avatar/" + String(avatarsize));
				e.className="reblog_avatar";
				e.setAttribute("data-lightbox","none");
				elem.insertBefore(e, elem.children[0]);
				elem.insertBefore(document.createTextNode(" "), elem.children[1]);
			}
		return elem;
	}

	for (let main of document.getElementsByClassName(boxName)) {
		let namelist = document.createElement("p");
		let curblock = main.cloneNode(true);
		let nblock = curblock;
		main.innerHTML = "";
		let is_bottom = !containsPost(curblock);
		if ((curblock.children.length > 2 && !is_bottom) || is_bottom) {
			let el = document.createElement("div");
			main.appendChild(el);
			el.className=wrapclass;
			if (is_bottom) {
				let isnew = true;
				if(curblock.children.length==2){
					let ch = curblock.children[0];
					isnew = !(ch.children.length>0 && ch.children[0].classList.contains("tumblr_blog") && curblock.children[1].tagName=="BLOCKQUOTE");
				} else {
					isnew = true;
				}
				if(!isnew){
					el.appendChild(makeName(curblock.children[0]));
					el.innerHTML += curblock.children[0].innerHTML;
				} else if(curblock.children.length>2) {
					el.insertAdjacentHTML("afterbegin",curblock.children[1].innerHTML);
					el.insertBefore(makeName(curblock.children[0]),el.childNodes[0]);
					el = document.createElement("div")
					el.className=wrapclass;
					main.appendChild(el);
					el.appendChild(makeName(host));
					let len = curblock.children.length;
					for (let i = 1; i < len; i++) {
						el.appendChild(curblock.children[1]);
					}
				} else {
					if (addnewname) {
						el.appendChild(makeName(host));
					}
					el.innerHTML += curblock.innerHTML;
				}
			} else {
				let len = curblock.children.length;
				el.appendChild(makeName(host))
				for (let i = 2; i < len; i++) {
					el.appendChild(curblock.children[2]);
				}
			}
		}
		while (!is_bottom) {
			is_bottom = !containsPost(curblock);
			let el = document.createElement("div");
			el.className = wrapclass;
			let n = curblock.children[0];
			el.appendChild(makeName(n));
			if(!is_bottom) {
				nblock = curblock.children[0].cloneNode(true);
				curblock.removeChild(curblock.children[0]);
				let len = nblock.children.length;
				for (let i = 2; i < len; i++) {
					el.appendChild(nblock.children[2]);
				}
				curblock = nblock;
			} else {
				let len = curblock.children[0].children.length;
				for (let i = 0; i < len; i++) {
					el.appendChild(curblock.children[0].children[0]);
				}
			}
			main.insertBefore(el, main.children[0]);
		}
	}
});}
