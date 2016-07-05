function path(SourceText){
	
	var backslash ="\\";
    var slash ="/";
	var volumes ="smb://bigpoint.local/shareddata/";
	var file ="file://";
	var colon =":";
	var Pos = 0;
	var searchTextLength = 0;
	var replacementTextLength = 0;
	
	var Prefix = 0; //get rid off that pesky Prefix
	
	// is the source a mac or a windows path
	var mac = SourceText.indexOf(volumes);
	var win = SourceText.indexOf(colon);
	var prefixinput = Prefix.length;

	// convert mac path into windows path
	if (mac > -1)
	{
	
		if (prefixinput == 0) {
			// replace volumes into file://
			searchTextLength = volumes.length;
			replacementTextLength = file.length;
			Pos = SourceText.indexOf(volumes, 0);
			while (Pos >= 0) {
				SourceText = SourceText.substring(0, Pos) + file + SourceText.substring(Pos + searchTextLength);
				Pos = SourceText.indexOf(volumes, Pos + replacementTextLength);
			}
		}
		// if prefix is given do the following:
		else { 
		
			// delete servername /Volumes/Servername/
			var deletestring1 = SourceText.split(/(\/|\*|\/|\*)/i)[1];
			var deletestring2 = SourceText.split(/(\/|\*|\/|\*)/i)[2];
			var deletestring3 = SourceText.split(/(\/|\*|\/|\*)/i)[3];
			var deletestring4 = SourceText.split(/(\/|\*|\/|\*)/i)[4];
			var deletestring5 = SourceText.split(/(\/|\*|\/|\*)/i)[5];
			
			var macservername = (deletestring1 + deletestring2 + deletestring3 + deletestring4 + deletestring5);
			
/*
			document.write(macservername);
			document.write(SourceText);
			document.write(Prefix);

*/			
			// replace macservername /volumes/servername/ into Prefix
			searchTextLength = macservername.length;
			replacementTextLength = Prefix.length;		
			Pos = SourceText.indexOf(macservername, 0);
			var prefixinput = Prefix;
			while (Pos >= 0) {
				SourceText = SourceText.substring(0, Pos) + Prefix + SourceText.substring(Pos + searchTextLength);
				Pos = SourceText.indexOf(macservername, Pos + replacementTextLength);
			}			
			// convert Slashes into Backslashes
			searchTextLength = slash.length;
			replacementTextLength = backslash.length;
			Pos = SourceText.indexOf(slash, 0);
			while (Pos >= 0) {
				SourceText = SourceText.substring(0, Pos) + backslash + SourceText.substring(Pos + searchTextLength);
				Pos = SourceText.indexOf(slash, Pos + replacementTextLength);
			
			}
		return SourceText;
		} 

	return SourceText;
	} else {
		
		// convert windows path into mac path
		if (win > -1){
			
			// it's a relative windows path
			var relative = SourceText.indexOf("file:");
			if (relative > -1) {
				
				var deletestring1 = SourceText.split(/(file\:\/\/|\*|\/)/)[2];
				var deletestring2 = SourceText.split(/(file\:\/\/|\*|\/)/)[3];
				SourceText = SourceText.replace(deletestring1,"");
				SourceText = SourceText.replace(deletestring2,"");
								
				searchTextLength = file.length;
				replacementTextLength = volumes.length;		
				Pos = SourceText.indexOf(file, 0);
				while (Pos >= 0) {
					SourceText = SourceText.substring(0, Pos) + volumes + SourceText.substring(Pos + searchTextLength);
					Pos = SourceText.indexOf(file, Pos + replacementTextLength);
				}
			

				return SourceText;				
			} 
				// it's an absolute windows path
				else {
				
				// convert drive letter into Volumes
				var drive = SourceText.indexOf(":\\");
				var prefixinput = Prefix.length;
				if (prefixinput > 0) {
					var prefixslash = Prefix + "/";
				} else {
					var prefixslash = "";
				}
				
				if (drive > -1) {
					searchTextLength = 2;
					replacementTextLength = volumes.length;
					Pos = SourceText.indexOf(":\\", 0);
					while (Pos >= 0) {
						SourceText = SourceText.substring(0, Pos) + volumes + prefixslash + SourceText.substring(Pos + searchTextLength);
						Pos = SourceText.indexOf(":\\", Pos + replacementTextLength);
					}
				}
				SourceText = SourceText.substr(1);
				
				// convert slashes into backslashes
				searchTextLength = backslash.length;
				replacementTextLength = slash.length;
				Pos = SourceText.indexOf(backslash, 0);
				while (Pos >= 0) {
					SourceText = SourceText.substring(0, Pos) + slash + SourceText.substring(Pos + searchTextLength);
					Pos = SourceText.indexOf(backslash, Pos + replacementTextLength);
				
				}
				return SourceText;

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
