$(function() {
	if($("#menu-sidebar").length){
		$("#menu-sidebar").html(getSidebarHtml());
		$("#menu-sidebar").metisMenu();
	}
});

//TODO mejorar esto y hacerlo con un .load()
function getSidebarHtml() {
	var sidebarMenu="";
sidebarMenu += "";
sidebarMenu += " <div class=\"sidebar-nav navbar-collapse\">";
sidebarMenu += "                    <ul class=\"nav\" id=\"side-menu\">";
sidebarMenu += "                        <li class=\"sidebar-search\">";
sidebarMenu += "                            <div class=\"input-group custom-search-form\">";
sidebarMenu += "                                <input type=\"text\" class=\"form-control\" placeholder=\"Search...\">";
sidebarMenu += "                                <span class=\"input-group-btn\">";
sidebarMenu += "                                <button class=\"btn btn-default\" type=\"button\">";
sidebarMenu += "                                    <i class=\"fa fa-search\"><\/i>";
sidebarMenu += "                                <\/button>";
sidebarMenu += "                            <\/span>";
sidebarMenu += "                            <\/div>";
sidebarMenu += "                            <!-- \/input-group -->";
sidebarMenu += "                        <\/li>";
sidebarMenu += "                        <li>";
sidebarMenu += "                            <a href=\"index.html\"><i class=\"fa fa-dashboard fa-fw\"><\/i> Dashboard<\/a>";
sidebarMenu += "                        <\/li>";
sidebarMenu += "                        <li>";
sidebarMenu += "                            <a href=\"#\"><i class=\"fa fa-users fa-fw\"><\/i> Usuarios<span class=\"fa arrow\"><\/span><\/a>";
sidebarMenu += "                            <ul class=\"nav nav-second-level\">";
sidebarMenu += "                                <li>";
sidebarMenu += "                                    <a href=\"registered-users.html\">Usuarios Registrados<\/a>";
sidebarMenu += "                                <\/li>";
sidebarMenu += "                                <li>";
sidebarMenu += "                                    <a href=\"active-users.html\">Usuarios Activos<\/a>";
sidebarMenu += "                                <\/li>";
sidebarMenu += "                                <li>";
sidebarMenu += "                                    <a href=\"users-characteristics.html\">Caracteristicas<\/a>";
sidebarMenu += "                                <\/li>";
sidebarMenu += "                            <\/ul>";
sidebarMenu += "                            <!-- \/.nav-second-level -->";
sidebarMenu += "                        <\/li>";
/*sidebarMenu += "                        <li>";
sidebarMenu += "                            <a href=\"tables.html\"><i class=\"fa fa-table fa-fw\"><\/i> Tables<\/a>";
sidebarMenu += "                        <\/li>";
sidebarMenu += "                        <li>";
sidebarMenu += "                            <a href=\"forms.html\"><i class=\"fa fa-edit fa-fw\"><\/i> Forms<\/a>";
sidebarMenu += "                        <\/li>";
sidebarMenu += "                        <li>";
sidebarMenu += "                            <a href=\"#\"><i class=\"fa fa-wrench fa-fw\"><\/i> UI Elements<span class=\"fa arrow\"><\/span><\/a>";
sidebarMenu += "                            <ul class=\"nav nav-second-level\">";
sidebarMenu += "                                <li>";
sidebarMenu += "                                    <a href=\"panels-wells.html\">Panels and Wells<\/a>";
sidebarMenu += "                                <\/li>";
sidebarMenu += "                                <li>";
sidebarMenu += "                                    <a href=\"buttons.html\">Buttons<\/a>";
sidebarMenu += "                                <\/li>";
sidebarMenu += "                                <li>";
sidebarMenu += "                                    <a href=\"notifications.html\">Notifications<\/a>";
sidebarMenu += "                                <\/li>";
sidebarMenu += "                                <li>";
sidebarMenu += "                                    <a href=\"typography.html\">Typography<\/a>";
sidebarMenu += "                                <\/li>";
sidebarMenu += "                                <li>";
sidebarMenu += "                                    <a href=\"icons.html\"> Icons<\/a>";
sidebarMenu += "                                <\/li>";
sidebarMenu += "                                <li>";
sidebarMenu += "                                    <a href=\"grid.html\">Grid<\/a>";
sidebarMenu += "                                <\/li>";
sidebarMenu += "                            <\/ul>";
sidebarMenu += "                            <!-- \/.nav-second-level -->";
sidebarMenu += "                        <\/li>";
sidebarMenu += "                        <li>";
sidebarMenu += "                            <a href=\"#\"><i class=\"fa fa-sitemap fa-fw\"><\/i> Multi-Level Dropdown<span class=\"fa arrow\"><\/span><\/a>";
sidebarMenu += "                            <ul class=\"nav nav-second-level\">";
sidebarMenu += "                                <li>";
sidebarMenu += "                                    <a href=\"#\">Second Level Item<\/a>";
sidebarMenu += "                                <\/li>";
sidebarMenu += "                                <li>";
sidebarMenu += "                                    <a href=\"#\">Second Level Item<\/a>";
sidebarMenu += "                                <\/li>";
sidebarMenu += "                                <li>";
sidebarMenu += "                                    <a href=\"#\">Third Level <span class=\"fa arrow\"><\/span><\/a>";
sidebarMenu += "                                    <ul class=\"nav nav-third-level\">";
sidebarMenu += "                                        <li>";
sidebarMenu += "                                            <a href=\"#\">Third Level Item<\/a>";
sidebarMenu += "                                        <\/li>";
sidebarMenu += "                                        <li>";
sidebarMenu += "                                            <a href=\"#\">Third Level Item<\/a>";
sidebarMenu += "                                        <\/li>";
sidebarMenu += "                                        <li>";
sidebarMenu += "                                            <a href=\"#\">Third Level Item<\/a>";
sidebarMenu += "                                        <\/li>";
sidebarMenu += "                                        <li>";
sidebarMenu += "                                            <a href=\"#\">Third Level Item<\/a>";
sidebarMenu += "                                        <\/li>";
sidebarMenu += "                                    <\/ul>";
sidebarMenu += "                                    <!-- \/.nav-third-level -->";
sidebarMenu += "                                <\/li>";
sidebarMenu += "                            <\/ul>";
sidebarMenu += "                            <!-- \/.nav-second-level -->";
sidebarMenu += "                        <\/li>";
sidebarMenu += "                        <li>";
sidebarMenu += "                            <a href=\"#\"><i class=\"fa fa-files-o fa-fw\"><\/i> Sample Pages<span class=\"fa arrow\"><\/span><\/a>";
sidebarMenu += "                            <ul class=\"nav nav-second-level\">";
sidebarMenu += "                                <li>";
sidebarMenu += "                                    <a href=\"blank.html\">Blank Page<\/a>";
sidebarMenu += "                                <\/li>";
sidebarMenu += "                                <li>";
sidebarMenu += "                                    <a href=\"login.html\">Login Page<\/a>";
sidebarMenu += "                                <\/li>";
sidebarMenu += "                            <\/ul>";
sidebarMenu += "                            <!-- \/.nav-second-level -->";
sidebarMenu += "                        <\/li>";*/
sidebarMenu += "                    <\/ul>";
sidebarMenu += "                <\/div>";
sidebarMenu += "                <!-- \/.sidebar-collapse -->";

return sidebarMenu;
}

//Loads the correct sidebar on window load,
//collapses the sidebar on window resize.
// Sets the min-height of #page-wrapper to window size
$(function() {
    $(window).bind("load resize", function() {
        topOffset = 50;
        width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
        if (width < 768) {
            $('div.navbar-collapse').addClass('collapse');
            topOffset = 100; // 2-row-menu
        } else {
            $('div.navbar-collapse').removeClass('collapse');
        }

        height = ((this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height) - 1;
        height = height - topOffset;
        if (height < 1) height = 1;
        if (height > topOffset) {
            $("#page-wrapper").css("min-height", (height) + "px");
        }
    });

    var url = window.location;
    var element = $('ul.nav a').filter(function() {
        return this.href == url || url.href.indexOf(this.href) == 0;
    }).addClass('active').parent().parent().addClass('in').parent();
    if (element.is('li')) {
        element.addClass('active');
    }
});
