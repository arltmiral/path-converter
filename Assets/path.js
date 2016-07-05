
function path(QuellText){
	
	var backslash ="\\";
    var slash ="/";
	var volumes ="smb://bigpoint.local/shareddata/";
	var file ="file://";
	var colon =":";
	var Pos = 0;
	var LaengeSuchText = 0;
	var LaengeErsatzText = 0;
	
	var Prefix = 0; //get rid off that pesky Prefix
	
	//mac oder win?
	var mac = QuellText.indexOf(volumes);
	var win = QuellText.indexOf(colon);
	var prefixinput = Prefix.length;
	//mac path into windowspath
	if (mac > -1)
	{
	
		if (prefixinput == 0) {
			// replace Volumes into file://
			LaengeSuchText = volumes.length;
			LaengeErsatzText = file.length;
			Pos = QuellText.indexOf(volumes, 0);
			while (Pos >= 0) {
				QuellText = QuellText.substring(0, Pos) + file + QuellText.substring(Pos + LaengeSuchText);
				Pos = QuellText.indexOf(volumes, Pos + LaengeErsatzText);
			}
		}
		// If Prefix is given do the following:
		else { 
		
			//Delete Servername /Volumes/Servername/
			var deletestring1 = QuellText.split(/(\/|\*|\/|\*)/i)[1];
			var deletestring2 = QuellText.split(/(\/|\*|\/|\*)/i)[2];
			var deletestring3 = QuellText.split(/(\/|\*|\/|\*)/i)[3];
			var deletestring4 = QuellText.split(/(\/|\*|\/|\*)/i)[4];
			var deletestring5 = QuellText.split(/(\/|\*|\/|\*)/i)[5];
			
			var macservername = (deletestring1 + deletestring2 + deletestring3 + deletestring4 + deletestring5);
			
/*
			document.write(macservername);
			document.write(QuellText);
			document.write(Prefix);

*/			
			// replace macservername /volumes/servername/ into Prefix
			LaengeSuchText = macservername.length;
			LaengeErsatzText = Prefix.length;		
			Pos = QuellText.indexOf(macservername, 0);
			var prefixinput = Prefix;
			while (Pos >= 0) {
				QuellText = QuellText.substring(0, Pos) + Prefix + QuellText.substring(Pos + LaengeSuchText);
				Pos = QuellText.indexOf(macservername, Pos + LaengeErsatzText);
			}			
			// convert Slashes into Backslashes
			LaengeSuchText = slash.length;
			LaengeErsatzText = backslash.length;
			Pos = QuellText.indexOf(slash, 0);
			while (Pos >= 0) {
				QuellText = QuellText.substring(0, Pos) + backslash + QuellText.substring(Pos + LaengeSuchText);
				Pos = QuellText.indexOf(slash, Pos + LaengeErsatzText);
			
			}
		return QuellText;
		} 

	return QuellText;
	}else {
		
		//is it a windowspath
		if (win > -1){
			
			//is the windowspath relative
			var relative = QuellText.indexOf("file:");
			if (relative > -1) {
				
				var deletestring1 = QuellText.split(/(file\:\/\/|\*|\/)/)[2];
				var deletestring2 = QuellText.split(/(file\:\/\/|\*|\/)/)[3];
				QuellText = QuellText.replace(deletestring1,"");
				QuellText = QuellText.replace(deletestring2,"");
								
				LaengeSuchText = file.length;
				LaengeErsatzText = volumes.length;		
				Pos = QuellText.indexOf(file, 0);
				while (Pos >= 0) {
					QuellText = QuellText.substring(0, Pos) + volumes + QuellText.substring(Pos + LaengeSuchText);
					Pos = QuellText.indexOf(file, Pos + LaengeErsatzText);
				}
			

				return QuellText;				
			} 
				// The path is absolute
				else {
				
				// convert drive letter into Volumes
				var drive = QuellText.indexOf(":\\");
				var prefixinput = Prefix.length;
				if (prefixinput > 0) {
					var prefixslash = Prefix + "/";
				} else {
					var prefixslash = "";
				}
				
				if (drive > -1) {
					LaengeSuchText = 2;
					LaengeErsatzText = volumes.length;
					Pos = QuellText.indexOf(":\\", 0);
					while (Pos >= 0) {
						QuellText = QuellText.substring(0, Pos) + volumes + prefixslash + QuellText.substring(Pos + LaengeSuchText);
						Pos = QuellText.indexOf(":\\", Pos + LaengeErsatzText);
					}
				}
				QuellText = QuellText.substr(1);
				
				// convert Slashes into Backslashes
				LaengeSuchText = backslash.length;
				LaengeErsatzText = slash.length;
				Pos = QuellText.indexOf(backslash, 0);
				while (Pos >= 0) {
					QuellText = QuellText.substring(0, Pos) + slash + QuellText.substring(Pos + LaengeSuchText);
					Pos = QuellText.indexOf(backslash, Pos + LaengeErsatzText);
				
				}
				return QuellText;

			}
			var err ="Nope, nope, nope! This is not a Windows Serverpath!"
			return err;
			
		}
		
		// outer if Return
		var err ="Nope, nope, nope! This is not a OS X serverpath"
		return err;
	}
	

	return "Something went horribly wrong. Please call the monkeys!";
}
