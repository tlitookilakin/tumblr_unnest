function unnest(boxName, avatarsize, showcolons, wrapclass, addnewname, openintab) {
	document.addEventListener("DOMContentLoaded",function(){
	let host = window.location.hostname.split(".").slice(0, -2);

	let containsPost = function(elem) {
		if (elem.children.length>1 && elem.children[1].children.length>0 ){
			let e = elem.children[1].children[0];
			return (e.children.length>0 && e.children[0].classList.contains("tumblr_blog"));
		} else { return false; }
	}

	for (let main of document.getElementsByClassName(boxName)) {
		let namelist = document.createElement("p");
		let curblock = main.cloneNode(true);
		let nblock = curblock;
		main.innerHTML = "";
		let is_bottom = !containsPost(curblock);
		if ((curblock.children.length > 2 && !is_bottom) || is_bottom) {
			let el = document.createElement("div");
			el.className=wrapclass;
			if (addnewname) {
				let ll = document.createElement("p");
				ll.className = "tumblr_blog";
				if (avatarsize > 0) {
					let imgpath = "http://api.tumblr.com/v2/blog/" + host + "/avatar/" + String(avatarsize);
					ll.innerHTML = "<img class='reblog_avatar' src='" + imgpath + "' data-lightbox='none' class='reblog_avatar'/> ";
				}
				ll.innerHTML += "<a href='javascript:void(0)'>" + host + "</a>";
				if (showcolons) {
					ll.innerHTML += ":";
				}	
				el.appendChild(ll);
			}
			if (is_bottom) {
				el.innerHTML += curblock.innerHTML;
			} else {
				let len = curblock.children.length;
				for (let i = 2; i < len; i++) {
					el.appendChild(curblock.children[2]);
				}
			}
			main.appendChild(el);
		}
		while (!is_bottom) {
			let is_bottom = !containsPost(curblock);
			el = document.createElement("div");
			el.className = wrapclass;
			let n = curblock.children[0];
			n.className="tumblr_blog";
			if (!showcolons) {
				n.innerHTML = n.innerHTML.slice(0, -1);
			}
			n.children[0].removeAttribute("class");
			if(openintab){
				n.children[0].setAttribute("target","_blank");
			}
			if (avatarsize > 0) {
				let bUrl = n.children[0].innerHTML;
				let e = document.createElement("img");
				e.setAttribute("src","http://api.tumblr.com/v2/blog/" + bUrl + "/avatar/" + String(avatarsize));
				e.className="reblog_avatar";
				e.setAttribute("data-lightbox","none");
				n.insertBefore(e, n.children[0]);
				n.insertBefore(document.createTextNode(" "), n.children[1]);
			}
			el.appendChild(n);
			if (is_bottom) {
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
