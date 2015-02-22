<?php 

// Chargement de la conf
$conf = json_decode(file_get_contents('./conf/conf.prod.json'));
/*
echo "<!--";
print_r($conf);
echo "-->";
*/
?>

<!DOCTYPE html>
<html>
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<head>

		<link rel="stylesheet" href="<?php echo $conf -> libs -> jquery_mobile_css; ?>">

		<script src="<?php echo $conf -> libs -> openlayers; ?>"></script>
		<script src="<?php echo $conf -> libs -> jquery; ?>"></script>
		<script src="<?php echo $conf -> libs -> jquery_mobile_js; ?>"></script>

        <script>var debug = <?php echo $conf -> debug; ?>;</script>
		<script src="demo_mobile.js"></script>
		
        <style>
            #map {
                height:400px;
                background-color:"#CCFFFF";
            }
        </style>
		<!--
		<link rel="stylesheet" href="http://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.css">
		<script src="http://code.jquery.com/jquery-1.11.2.min.js"></script>
		<script src="http://code.jquery.com/mobile/1.4.5/jquery.mobile-1.4.5.min.js"></script>
		-->

	</head>
	<body>
		<div data-role="page" id="pageone">
		    
			<div data-role="header">
				<h1>Démo geoloc</h1>
				
				<a id="btn-geoloc" href="#" data-icon="navigation" class="ui-btn-right">Géoloc</a>                

				<div data-role="popup" id="popupBasic" class="ui-content">
                    <p>This is a completely basic popup, no options set.</p>
                </div>
                <!--
                <input id="btn-geoloc" type="checkbox" data-role="flipswitch" name="flip-checkbox-1"/>
                -->
			</div>

			<div data-role="content">
				<ul data-role="listview" data-inset="true" data-theme="c" data-dividertheme="a">
					<li data-role="list-divider">
						Geoloc
					</li>
					<li id="lat">
						-
					</li>
					<li id="lon">
						-
					</li>
					<li  id="accuracy">
						-
					</li>
                    <li  id="altitude">
                        -
                    </li>
				</ul>
				<br />
			</div>
			<div data-role="content">
			    <div id="map" style="height: 400px;"></div>
            </div>
			    
			</div>
			<div data-role="footer">
				<h1>Footer Text</h1>
			</div>
		</div>



	</body>
</html>

