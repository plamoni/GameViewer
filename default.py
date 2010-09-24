from google.appengine.ext.webapp import template
from google.appengine.ext import webapp
from google.appengine.ext.webapp.util import run_wsgi_app
import os
import logging

LOCATION = "/"

def p(file_name):
	return os.path.join(os.path.dirname(__file__), file_name)
		
class Handler(webapp.RequestHandler):
	def get(self):
		logging.info("[Game Viewer] REFERER: " + self.request.referer)
		self.response.out.write(template.render(p('index.html'), {}))

application = webapp.WSGIApplication([(LOCATION + ".*", Handler)],debug=True)

def main():
	run_wsgi_app(application)
	
if __name__ == "__main__":
	main()