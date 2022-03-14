/////////////////////////////////////////////////////////////////////////////////////////////////
$(document).ready(function() {
	$(document).trigger("pageReady");
	changeHorizNav(1);
	$(document).trigger("initNextProject");
	if($("#current_page").val() > 1) {
		changeHorizNav($("#current_page").val());
		setTimeout("changePaginationToCF()",100);
	}
	// hack for audio
	setTimeout(function(){
		unloadAudio()
		checkForSound()		
	}, 0)		
});
/////////////////////////////////////////////////////////////////////////////////////////////////
function changePaginationToCF() {
	var prev_page = parseInt($("#current_page").val()) - 1;
	var next_page = parseInt($("#current_page").val()) + 1;
	
	$(".prev_page").removeAttr("onclick").click(function() {
		changePageCF(prev_page);
		return false;
	});
	$(".next_page").removeAttr("onclick").click(function() {
		changePageCF(next_page);
		return false;
	});
	
}
/////////////////////////////////////////////////////////////////////////////////////////////////
function changePageCF(newpage) {
	$(document).trigger("pageChange", [newpage]);
	var limit = $("#limit").val();
	var cur = document.getElementById('current_page').value;
	var total_pages = document.getElementById('total_pages').value;
	var current_page = document.getElementById('page_'+cur);
	var current_nav = document.getElementById('nav_page_'+cur);
	var new_page = document.getElementById('page_'+newpage);
	var new_nav = document.getElementById('nav_page_'+newpage);
	var pagination = document.getElementById('pagination');
	
	// Remove the thumb highlight
	Projects.Helper.RemoveThumbHighlight();
	
	// dump the old nav
	if(current_nav) current_nav.style.display = "none";
	
	// show the new nav
	if(new_nav) new_nav.style.display = "block";
	
	// dump prev page thumbs
	if(current_page) current_page.style.display = "none";
	
	// change pagination
	var pagout = "";
	if(newpage > 1) pagout += "<a href=\"javascript:void(0)\" onclick=\"changePageCF("+(parseInt(newpage)-1)+","+limit+")\" class=\"prev_page\">Prev page</a>";
	if(newpage > 1 && newpage < total_pages) pagout += "<span>&nbsp;/&nbsp;</span>";
	if(newpage < total_pages) pagout += "<a href=\"javascript:void(0)\" onclick=\"changePageCF("+(parseInt(newpage)+1)+","+limit+")\" class=\"next_page\">Next page</a>";
	pagout += "&nbsp;<span>("+newpage+" of "+total_pages+")</span>";
	
	if($(".pagination").length > 0) $(".pagination").each(function() { $(this).html(pagout); });
	
	
	// show next page thumbs
	if(new_page) {
		showNextPageThumbs( newpage );
	}
	
	// set new page values
	document.getElementById('current_page').value = newpage;
	curspot = cur < newpage ? (cur*limit)-1 : ((newpage-1)*limit)-1;
	document.getElementById('this_spot').value = curspot;
		
	window.scrollTo(0,0);
	
	changeHorizNav(newpage);
	$(document).trigger("pageChangeComplete", [newpage]);
}