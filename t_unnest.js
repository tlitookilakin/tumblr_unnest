function unnest(boxName, avatarsize, showcolons, wrapclass, addnewname, openintab) {
	document.addEventListener("DOMContentLoaded",function(){
	var host = window.location.hostname.split(".").slice(0, -2);

	for (var main of document.getElementsByClassName(boxName)) {
		var namelist = document.createElement("p");
		var curblock = main.cloneNode(true);
		var nblock = curblock;
		main.innerHTML = "";
		var is_bottom = !containsPost(curblock);
		if ((curblock.children.length > 2 && !is_bottom) || is_bottom) {
			var el = document.createElement("div");
			el.className=wrapclass;
			if (addnewname) {
				let ll = document.createElement("p");
				ll.className = "tumblr_blog";
				if (avatarsize > 0) {
					let imgpath = "http://api.tumblr.com/v2/blog/" + host + "/avatar/" + String(avatarsize);
					ll.innerHTML = "<img class='reblog_avatar' src='" + imgpath + "'/> ";
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
			is_bottom = !containsPost(curblock);
			if (!is_bottom) {
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
					n.insertBefore(e, n.children[0]);
					n.insertBefore(document.createTextNode(" "), n.children[1]);
				}
				el.appendChild(n);
				nblock = curblock.children[0].cloneNode(true);
				curblock.removeChild(curblock.children[0]);
				let len = nblock.children.length;
				for (let i = 2; i < len; i++) {
					el.appendChild(nblock.children[2]);
				}
			} else {
				el = main.children[0];
				el.innerHTML += curblock.innerHTML;
			}
			curblock = nblock;
			main.insertBefore(el, main.children[0]);
		}
	}

	function containsPost(elem) {
		try {
			return elem.children[0].children[0].classList.contains("tumblr_blog");
		} catch (error) {
			return false;
		}
	}
});}
